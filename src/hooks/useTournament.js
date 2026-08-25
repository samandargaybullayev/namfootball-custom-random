import { useState, useCallback } from 'react'
import { LEAGUES } from '../constants/teams'

const STORAGE_KEY_PREFIX = 'tournament-teams-'
const LEAGUE_STORAGE_KEY = 'tournament-current-league'
const RIGGED_KEY = 'tournament-is-rigged'

const loadFromStorage = (key) => {
  try {
    const saved = localStorage.getItem(key)
    if (saved) return JSON.parse(saved)
  } catch (error) {
    console.error(`localStorage error (${key}):`, error)
  }
  return null
}

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`localStorage save error (${key}):`, error)
  }
}

export const useTournament = () => {
  const savedLeague = loadFromStorage(LEAGUE_STORAGE_KEY) || 'cl'
  const savedIsRigged = loadFromStorage(RIGGED_KEY) === true

  const [activeLeagueId, setActiveLeagueId] = useState(savedLeague)
  const [isRigged, setIsRigged] = useState(savedIsRigged)
  const [isAnyAnimating, setIsAnyAnimating] = useState(false)

  // Hozirgi liga ma'lumotlari
  const currentLeague = LEAGUES[activeLeagueId] || LEAGUES.cl

  // Aktiv liga uchun saqlangan jamoalar
  const activeStorageKey = `${STORAGE_KEY_PREFIX}${activeLeagueId}`
  const savedTeams = loadFromStorage(activeStorageKey) || {}

  const [selectedTeams, setSelectedTeams] = useState(savedTeams)

  // Liga o'zgartirish handler
  const setLeague = useCallback((leagueId) => {
    if (!LEAGUES[leagueId]) return
    setActiveLeagueId(leagueId)
    saveToStorage(LEAGUE_STORAGE_KEY, leagueId)
    const leagueTeams = loadFromStorage(`${STORAGE_KEY_PREFIX}${leagueId}`) || {}
    setSelectedTeams(leagueTeams)
  }, [])

  // Mavjud va bloklangan jamoalar
  const availableTeams = currentLeague.teams.filter(t => !Object.values(selectedTeams).includes(t))

  const selectTeam = useCallback((slotId, teamName) => {
    setSelectedTeams(prev => {
      const newSelected = { ...prev, [slotId]: teamName }
      saveToStorage(`${STORAGE_KEY_PREFIX}${activeLeagueId}`, newSelected)
      return newSelected
    })
    setIsAnyAnimating(false)
  }, [activeLeagueId])

  const setAnimating = useCallback((isAnimating) => {
    setIsAnyAnimating(isAnimating)
  }, [])

  const isSlotLocked = useCallback((slotId) => {
    return slotId in selectedTeams
  }, [selectedTeams])

  const getSelectedTeam = useCallback((slotId) => {
    return selectedTeams[slotId] || null
  }, [selectedTeams])

  const resetTournament = useCallback(() => {
    if (window.confirm(`"${currentLeague.name}" turniri o'yin jadvalini qayta tiklashni xohlaysizmi?`)) {
      setSelectedTeams({})
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}${activeLeagueId}`)
    }
  }, [activeLeagueId, currentLeague.name])

  const toggleRiggedMode = useCallback(() => {
    setIsRigged(prev => {
      const val = !prev
      saveToStorage(RIGGED_KEY, val)
      return val
    })
  }, [])

  // Slot uchun mos va guruh qoidalariga javob beradigan jamoalarni tanlash
  const getValidTeamsForSlot = useCallback((slotId) => {
    if (!slotId.startsWith('slot-group8')) {
      return availableTeams
    }

    const isLeft = slotId.startsWith('slot-group8-') && !slotId.includes('-rev-')
    const slotIndex = parseInt(slotId.replace('slot-group8-rev-', '').replace('slot-group8-', ''), 10)
    const isP1Slot = slotIndex % 2 === 0 // Juft slot: P1 (1-o'rin / 3-o'rin)
    const isP2Slot = !isP1Slot // Toq slot: P2 (2-o'rin / 4-o'rin)

    const groups = currentLeague.groups

    return availableTeams.filter(teamName => {
      // 1. Jamoa mos o'ringa tegishli ekanligini tekshirish
      const groupObj = groups.find(g => (isP1Slot ? g.p1 === teamName : g.p2 === teamName))
      if (!groupObj) return false

      // 2. Guruhdosh jamoa qoidasi:
      // Guruhdosh jamoa faqat qarama-qarshi qanotda bo'lishi kerak (Left vs Right)
      const partnerName = isP1Slot ? groupObj.p2 : groupObj.p1

      // Guruhdoshi allaqachon tanlanganmi?
      const partnerSlotId = Object.keys(selectedTeams).find(s => selectedTeams[s] === partnerName)

      if (partnerSlotId) {
        const partnerIsLeft = partnerSlotId.startsWith('slot-group8-') && !partnerSlotId.includes('-rev-')
        if (isLeft === partnerIsLeft) {
          // Bitta qanotda joylashib qoladi -> MUMKIN EMAS!
          return false
        }
      }

      return true
    })
  }, [availableTeams, currentLeague, selectedTeams])

  return {
    activeLeagueId,
    setLeague,
    currentLeague,
    availableTeams,
    selectTeam,
    isSlotLocked,
    getSelectedTeam,
    resetTournament,
    isAnyAnimating,
    setAnimating,
    isRigged,
    toggleRiggedMode,
    getValidTeamsForSlot
  }
}



