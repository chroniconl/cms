import React, { useEffect, useRef } from 'react'
import Typed from 'typed.js'

interface TypedComponentProps {
  strings: string[]
  typeSpeed?: number
  showCursor?: boolean
  cursorChar?: string
}

const TypedComponent: React.FC<TypedComponentProps> = ({
  strings,
  typeSpeed = 50,
  showCursor = true,
  cursorChar = '|',
}) => {
  const typedElement = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (typedElement.current) {
      const options = {
        strings,
        typeSpeed: typeSpeed,
        showCursor: showCursor,
        cursorChar: cursorChar,
      }

      const typed = new Typed(typedElement.current, options)

      return () => {
        typed.destroy()
      }
    }
  }, [strings])

  return <span ref={typedElement} />
}

export default TypedComponent
