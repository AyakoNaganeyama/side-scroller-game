import React, { useState, useEffect, useRef } from 'react'
import './App.css'

const App = () => {
  // State to track the player's position on the grid
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 4 })

  // References to the player element and the container
  const playerRef = useRef(null)
  const containerRef = useRef(null)

  // Function to handle key press events for player movement
  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowRight':
        setPlayerPosition((prev) => ({ ...prev, x: Math.min(prev.x + 1, 39) })) // Move right, limit to column 39
        break
      case 'ArrowLeft':
        setPlayerPosition((prev) => ({ ...prev, x: Math.max(prev.x - 1, 0) })) // Move left, limit to column 0
        break
      case 'ArrowUp':
        setPlayerPosition((prev) => ({ ...prev, y: Math.max(prev.y - 1, 0) })) // Move up, limit to row 0
        break
      case 'ArrowDown':
        setPlayerPosition((prev) => ({ ...prev, y: Math.min(prev.y + 1, 9) })) // Move down, limit to row 9
        break
      default:
        break
    }
  }

  // Add event listener for keydown events
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Scroll the container to keep the player centered
  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      const playerElement = playerRef.current
      const playerOffset =
        playerElement.offsetLeft + playerElement.offsetWidth / 2
      const scrollOffset = containerWidth / 2
      containerRef.current.scrollLeft = playerOffset - scrollOffset
    }
  }, [playerPosition])

  return (
    <div className='game-container' ref={containerRef}>
      <div className='background-grid'>
        <div
          ref={playerRef}
          className='player'
          style={{
            gridColumn: `${playerPosition.x + 1} / span 1`,
            gridRow: `${playerPosition.y + 1} / span 1`,
          }}
        ></div>
        {/* Add ground, pipe, and coin elements */}
        <div
          className='ground'
          style={{ gridColumn: '1 / span 40', gridRow: '10 / span 1' }}
        ></div>
        <div
          className='pipe'
          style={{ gridColumn: '10 / span 1', gridRow: '8 / span 3' }}
        ></div>
        <div
          className='coin'
          style={{ gridColumn: '15 / span 1', gridRow: '5 / span 1' }}
        ></div>
      </div>
    </div>
  )
}

export default App
