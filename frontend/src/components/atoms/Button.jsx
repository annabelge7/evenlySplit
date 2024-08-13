'use client'
import { useState } from 'react'

export default function Button({
  text,
  onClick,
  width,
  height,
  color,
  textSize,
  type,
}) {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)

    if (onClick) {
      onClick()
    }
  }

  return (
    <button
      style={{ fontSize: textSize }}
      className={`
        text-white 
        bg-${color}
        hover:bg-darkblue
        w-${width}
        h-${height}
        mt-2
        rounded-md 
        p-3
        text-center 
        font-bold
        shadow-lg
        transition
        duration-200
        ease-in-out
      `}
      onClick={handleClick}
      {...(type !== undefined ? { type } : {})}
    >
      {text}
    </button>
  )
}
