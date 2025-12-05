import { useState, useCallback } from 'react'
import { TEAMS } from '../constants/teams'

const STORAGE_KEY = 'tournament-selected-teams'

// localStorage dan ma'lumotlarni yuklash
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    console.error('localStorage dan yuklashda xatolik:', error)
  }
  return {}
}

// localStorage ga saqlash
const saveToStorage = (selectedTeams) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedTeams))
  } catch (error) {
    console.error('localStorage ga saqlashda xatolik:', error)
  }
}

export const useTournament = () => {
  // localStorage dan yuklash
  const savedTeams = loadFromStorage()
  
  // Tanlangan jamoalarni hisoblash
  const initialSelectedTeams = savedTeams || {}
  const initialAvailableTeams = TEAMS.filter(team => !Object.values(initialSelectedTeams).includes(team))
  const initialLockedSlots = new Set(Object.keys(initialSelectedTeams))

  const [availableTeams, setAvailableTeams] = useState(initialAvailableTeams)
  const [selectedTeams, setSelectedTeams] = useState(initialSelectedTeams)
  const [lockedSlots, setLockedSlots] = useState(initialLockedSlots)
  const [isAnyAnimating, setIsAnyAnimating] = useState(false)

  const selectTeam = useCallback((slotId, teamName) => {
    setSelectedTeams(prev => {
      const newSelected = {
        ...prev,
        [slotId]: teamName
      }
      // localStorage ga saqlash
      saveToStorage(newSelected)
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
      alert('Turnir muvaffaqiyatli qayta tiklandi!')
    }
  }, [])

  return {
    availableTeams,
    selectTeam,
    isSlotLocked,
    getSelectedTeam,
    getAllSelectedTeams,
    resetTournament,
    isAnyAnimating,
    setAnimating
  }
}


