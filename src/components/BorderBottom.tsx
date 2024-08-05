'use client'
import React, { useEffect, useState, useRef } from 'react'

interface BorderBottomProps {
  height?: number
  borderColor?: string
  spaceBetween?: number
}

export const BorderBottom: React.FC<BorderBottomProps> = ({
  height = 1,
  borderColor = '#FFF',
  spaceBetween = 5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [divCount, setDivCount] = useState(0)

  useEffect(() => {
    const calculateDivCount = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const divWidth = height
        const totalWidth = divWidth + spaceBetween
        const count = Math.floor(containerWidth / totalWidth)
        setDivCount(count)
      }
    }

    // Initial calculation
    calculateDivCount()

    // Recalculate on window resize
    window.addEventListener('resize', calculateDivCount)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', calculateDivCount)
    }
  }, [height])

  const defaultStyles = {
    width: '100%',
    height: `${height}px`,
    borderBottom: `1px solid rgb(168 162 158)`,
  }

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {divCount === 0 && <div style={defaultStyles}></div>}
      {Array.from({ length: divCount }).map((_, index) => (
        <div
          key={index}
          style={{
            width: `${height}px`,
            height: `${height}px`,
            backgroundColor: borderColor,
            marginRight: index !== divCount - 1 ? spaceBetween + 'px' : '0',
          }}
        ></div>
      ))}
    </div>
  )
}

export default BorderBottom
