const BracketLine = ({ from, to, isVertical = false, isHorizontal = false }) => {
  if (isVertical) {
    return (
      <div className="absolute w-0.5 bg-purple-500/60" style={{ height: '100%', left: '50%', transform: 'translateX(-50%)' }} />
    )
  }

  if (isHorizontal) {
    return (
      <div className="absolute h-0.5 bg-purple-500/60" style={{ width: '100%', top: '50%', transform: 'translateY(-50%)' }} />
    )
  }

  // SVG path for connecting lines
  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <path
        d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
        stroke="#A855F7"
        strokeWidth="2"
        strokeOpacity="0.6"
        fill="none"
      />
    </svg>
  )
}

export default BracketLine


