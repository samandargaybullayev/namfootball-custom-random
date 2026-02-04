import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { playStopSound } from '../utils/sounds'

const RouletteAnimation = ({ teams, validTeams = null, onComplete, isActive = false, duration = 2000, targetTeam = null }) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const animationRef = useRef(null)
  const itemHeight = 60 // Height of each team item

  useEffect(() => {
    if (teams.length === 0) return

    if (!isActive) {
      // Reset when not active
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      setScrollPosition(0)
      setSelectedTeam(null)
      setIsAnimating(false)
      return
    }

    // Prevent multiple animations - check if already animating
    if (isAnimating || animationRef.current) return

    setIsAnimating(true)

    // Start animation
    let startTime = Date.now()
    const totalHeight = teams.length * itemHeight
    // Agar validTeams berilgan bo'lsa, faqat validTeams dan tanlash
    // Aks holda teams dan tanlash
    const selectableTeams = validTeams && validTeams.length > 0 ? validTeams : teams

    // Determine the result
    let selectedTeamName
    if (targetTeam) {
      selectedTeamName = targetTeam
    } else {
      const randomTeamIndex = Math.floor(Math.random() * selectableTeams.length)
      selectedTeamName = selectableTeams[randomTeamIndex]
    }

    // Animatsiyada teams dan selectedTeamName ni topish
    const displayTeamIndex = teams.findIndex(team => team === selectedTeamName)
    const targetPosition = displayTeamIndex >= 0 ? displayTeamIndex * itemHeight : 0
    const extraScrolls = 2 // Number of full rotations before stopping
    const finalPosition = targetPosition + (totalHeight * extraScrolls)

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      if (progress < 1) {
        // Ease-out function: start fast, slow down gradually
        const easeOut = 1 - Math.pow(1 - progress, 3)

        // Calculate scroll position with easing
        const currentPosition = finalPosition * easeOut
        setScrollPosition(currentPosition)

        animationRef.current = requestAnimationFrame(animate)
      } else {
        // Stop at selected team - ensure we stop exactly
        setScrollPosition(finalPosition)
        setSelectedTeam(selectedTeamName)
        setIsAnimating(false)
        animationRef.current = null
        playStopSound() // Play stop sound

        setTimeout(() => {
          if (onComplete) {
            onComplete(selectedTeamName)
          }
        }, 300)
      }
    }

    // Small delay before starting
    const timeoutId = setTimeout(() => {
      startTime = Date.now()
      animationRef.current = requestAnimationFrame(animate)
    }, 50)

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      setIsAnimating(false)
    }
  }, [teams, isActive, duration, onComplete, itemHeight])

  if (teams.length === 0 || !isActive) {
    return (
      <span className="text-4xl font-bold text-purple-300 opacity-60">
        ?
      </span>
    )
  }

  // Create extended list for seamless loop (show teams multiple times for smooth scrolling)
  const extendedTeams = [...teams, ...teams, ...teams, ...teams, ...teams]

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: `${itemHeight}px` }}
    >
      {/* Left side indicator */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 bg-neon-cyan z-10 shadow-neon opacity-80"
        style={{
          background: 'linear-gradient(to bottom, transparent, #00F5FF, transparent)',
          width: '3px'
        }}
      />

      {/* Right side indicator */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1 bg-neon-cyan z-10 shadow-neon opacity-80"
        style={{
          background: 'linear-gradient(to bottom, transparent, #00F5FF, transparent)',
          width: '3px'
        }}
      />

      {/* Top indicator */}
      <div
        className="absolute left-0 right-0 h-0.5 bg-neon-cyan z-10 shadow-neon"
        style={{ top: 0 }}
      />

      {/* Bottom indicator */}
      <div
        className="absolute left-0 right-0 h-0.5 bg-neon-cyan z-10 shadow-neon"
        style={{ bottom: 0 }}
      />

      {/* Scrollable team list */}
      <motion.div
        animate={{
          y: -scrollPosition
        }}
        transition={{
          type: "tween",
          duration: 0.05,
          ease: "linear"
        }}
        className="absolute inset-0"
      >
        {extendedTeams.map((team, index) => (
          <div
            key={`${team}-${index}`}
            className="flex items-center justify-center w-full"
            style={{
              height: `${itemHeight}px`,
              opacity: selectedTeam && team === selectedTeam && index === Math.floor(scrollPosition / itemHeight) ? 1 : 0.8
            }}
          >
            <span className="text-lg font-bold text-white text-center px-2">
              {team}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default RouletteAnimation
