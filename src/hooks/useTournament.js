import { useState, useCallback } from 'react'
import { TEAMS } from '../constants/teams'

const STORAGE_KEY = 'tournament-selected-teams'
const RIGGED_KEY = 'tournament-is-rigged'

// localStorage dan ma'lumotlarni yuklash
const loadFromStorage = (key) => {
  try {
    const saved = localStorage.getItem(key)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    console.error(`localStorage dan ${key} ni yuklashda xatolik:`, error)
  }
  return null
}

// localStorage ga saqlash
const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`localStorage ga ${key} ni saqlashda xatolik:`, error)
  }
}

export const useTournament = () => {
  // localStorage dan yuklash
  const savedTeams = loadFromStorage(STORAGE_KEY)
  const savedIsRigged = loadFromStorage(RIGGED_KEY)

  // Tanlangan jamoalarni hisoblash
  const initialSelectedTeams = savedTeams || {}
  const initialAvailableTeams = TEAMS.filter(team => !Object.values(initialSelectedTeams).includes(team))
  const initialLockedSlots = new Set(Object.keys(initialSelectedTeams))

  const [availableTeams, setAvailableTeams] = useState(initialAvailableTeams)
  const [selectedTeams, setSelectedTeams] = useState(initialSelectedTeams)
  const [lockedSlots, setLockedSlots] = useState(initialLockedSlots)
  const [isAnyAnimating, setIsAnyAnimating] = useState(false)
  const [isRigged, setIsRigged] = useState(savedIsRigged === true) // Default false, but respect saved true

  const selectTeam = useCallback((slotId, teamName) => {
    setSelectedTeams(prev => {
      const newSelected = {
        ...prev,
        [slotId]: teamName
      }
      // localStorage ga saqlash
      saveToStorage(STORAGE_KEY, newSelected)
      return newSelected
    })
    setAvailableTeams(prev => prev.filter(team => team !== teamName))
    setLockedSlots(prev => new Set([...prev, slotId]))
    setIsAnyAnimating(false) // Animation completed
  }, [])

  const setAnimating = useCallback((isAnimating) => {
    setIsAnyAnimating(isAnimating)
  }, [])

  const isSlotLocked = useCallback((slotId) => {
    return lockedSlots.has(slotId)
  }, [lockedSlots])

  const getSelectedTeam = useCallback((slotId) => {
    return selectedTeams[slotId] || null
  }, [selectedTeams])

  const getAllSelectedTeams = useCallback(() => {
    return selectedTeams
  }, [selectedTeams])

  const resetTournament = useCallback(() => {
    // Alert chiqarish
    if (window.confirm('Barcha tanlangan jamoalarni o\'chirishni xohlaysizmi? Bu amalni qaytarib bo\'lmaydi.')) {
      setAvailableTeams([...TEAMS])
      setSelectedTeams({})
      setLockedSlots(new Set())
      // localStorage ni tozalash
      localStorage.removeItem(STORAGE_KEY)
      // Note: We do NOT reset isRigged state here, it persists
      alert('Turnir muvaffaqiyatli qayta tiklandi!')
    }
  }, [])

  const toggleRiggedMode = useCallback(() => {
    setIsRigged(prev => {
      const newValue = !prev
      saveToStorage(RIGGED_KEY, newValue)
      return newValue
    })
  }, [])

  return {
    availableTeams,
    selectTeam,
    isSlotLocked,
    getSelectedTeam,
    getAllSelectedTeams,
    resetTournament,
    isAnyAnimating,
    setAnimating,
    isRigged,
    toggleRiggedMode
  }
}


