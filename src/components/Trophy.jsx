import { motion } from 'framer-motion'

const Trophy = ({ onExport, canExport = false }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex flex-col items-center justify-center cursor-pointer"
      onClick={canExport ? onExport : undefined}
    >
      <motion.div
        animate={canExport ? {
          filter: [
            "drop-shadow(0 0 15px rgba(255, 215, 0, 0.6))",
            "drop-shadow(0 0 25px rgba(255, 215, 0, 0.9))",
            "drop-shadow(0 0 15px rgba(255, 215, 0, 0.6))"
          ]
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`
          w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40
          flex items-center justify-center
          ${canExport ? 'hover:drop-shadow-[0_0_30px_rgba(255,215,0,0.9)]' : 'opacity-50 cursor-not-allowed'}
          transition-all duration-300
        `}
      >
        <svg
          viewBox="0 0 120 140"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cup body - more elegant design */}
          <ellipse cx="60" cy="50" rx="35" ry="25" fill="#FFD700" />
          <ellipse cx="60" cy="50" rx="30" ry="20" fill="#FFA500" opacity="0.3" />
          
          {/* Cup rim */}
          <ellipse cx="60" cy="30" rx="38" ry="8" fill="#FFD700" />
          <ellipse cx="60" cy="30" rx="38" ry="8" fill="none" stroke="#FFA500" strokeWidth="1.5" />
          
          {/* Cup base */}
          <rect x="45" y="70" width="30" height="8" rx="2" fill="#FFD700" />
          <rect x="48" y="78" width="24" height="12" rx="2" fill="#FFA500" />
          
          {/* Handles - curved design */}
          <path
            d="M 25 45 Q 10 45 10 60 Q 10 75 25 75"
            stroke="#FFD700"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 95 45 Q 110 45 110 60 Q 110 75 95 75"
            stroke="#FFD700"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Decorative lines on cup */}
          <ellipse cx="60" cy="40" rx="25" ry="15" fill="none" stroke="#FFA500" strokeWidth="1" opacity="0.5" />
          <ellipse cx="60" cy="55" rx="20" ry="12" fill="none" stroke="#FFA500" strokeWidth="1" opacity="0.5" />
          
          {/* Crown/star on top */}
          <path
            d="M 60 15 L 62 22 L 69 22 L 63 26 L 65 33 L 60 29 L 55 33 L 57 26 L 51 22 L 58 22 Z"
            fill="#FFA500"
          />
        </svg>
      </motion.div>
      
      {canExport && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gold text-sm font-semibold mt-2 text-center"
        >
          Click to Export
        </motion.p>
      )}
    </motion.div>
  )
}

export default Trophy

