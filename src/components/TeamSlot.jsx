import { useState } from 'react'
import { motion } from 'framer-motion'
import RouletteAnimation from './RouletteAnimation'
import { playClickSound } from '../utils/sounds'

const TeamSlot = ({ slotId, availableTeams, animationTeams = null, validTeams = null, isLocked, selectedTeam, onSelect, isAnyAnimating, setAnimating, enableRoulette = false, customText = null, customGradient = null, targetTeam = null }) => {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    // Prevent if roulette is disabled, any animation is running or this slot is locked/selected
    if (!enableRoulette || isLocked || selectedTeam || isAnimating || isAnyAnimating || availableTeams.length === 0) return

    playClickSound() // Play click sound
    setIsAnimating(true)
    if (setAnimating) {
      setAnimating(true) // Set global animation state
    }
  }

  const handleRouletteComplete = (teamName) => {
    setIsAnimating(false)
    if (setAnimating) {
      setAnimating(false) // Clear global animation state
    }
    if (onSelect) {
      onSelect(slotId, teamName)
    }
  }

  const canInteract = enableRoulette && !isLocked && !selectedTeam && !isAnimating && !isAnyAnimating && availableTeams.length > 0
  // Chorak/Yarim final uchun hover effektini yoqish (customText bo'lsa ham)
  const allowHover = customText || canInteract

  // Gradient va border klasslarini aniqlash
  const gradientClass = customGradient ? '' : 'bg-gradient-to-br from-purple-800/90 via-purple-700/80 to-purple-900/90'
  const borderClass = customGradient ? 'border-0' : 'border-2 border-purple-500/60' // Chorak/yarim final uchun border yo'q
  const hoverBorderClass = customGradient ? 'hover:opacity-90' : 'hover:border-purple-300'

  // Gradient style - customGradient bo'lsa style object sifatida, aks holda undefined
  const gradientStyle = customGradient || undefined

  return (
    <motion.div
      className={`
        relative w-full min-h-[70px] md:min-h-[80px] rounded-xl
        ${gradientClass}
        ${borderClass}
        shadow-lg backdrop-blur-sm
        flex items-center justify-center
        transition-all duration-300
        ${allowHover ? `${hoverBorderClass} hover:shadow-glow cursor-pointer` : 'cursor-not-allowed opacity-90 border-purple-400/40'}
        ${isAnimating ? 'border-neon-cyan shadow-neon ring-2 ring-neon-cyan/50' : ''}
      `}
      style={gradientStyle ? { background: gradientStyle } : undefined}
      onClick={handleClick}
    >
      <div className="w-full h-full flex items-center justify-center p-3">
        {selectedTeam ? (
          <span className="text-lg font-bold text-white text-center px-2">
            {selectedTeam}
          </span>
        ) : enableRoulette ? (
          <RouletteAnimation
            teams={animationTeams || availableTeams}
            validTeams={validTeams || availableTeams}
            onComplete={handleRouletteComplete}
            isActive={isAnimating}
            duration={2000}
            targetTeam={targetTeam}
          />
        ) : customText ? (
          <span className="text-lg md:text-xl font-bold text-white text-center px-2">
            {customText}
          </span>
        ) : (
          <span className="text-4xl font-bold text-purple-300 opacity-60">
            ?
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default TeamSlot
