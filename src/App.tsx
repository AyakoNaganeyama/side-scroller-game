import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Pipe from './components/Pipe'

const App = () => {
  // State to track the player's position on the grid
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 4 }) // initial position

  // References to the player element and the container
  const playerRef = useRef(null) // reference to the player in the DOM
  const containerRef = useRef(null) // reference to the container in the DOM

  // 1.Function to handle key press events for player movement, at the moemnt you move +1 from the previous position

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

  // 1.Add event listener for keydown events
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // 1.Scroll the container to keep the player centered
  useEffect(() => {
    // useEffect can directly manupilate DOM
    if (containerRef.current) {
      // access to container element
      const containerWidth = containerRef.current.offsetWidth // full width of the container
      const playerElement = playerRef.current
      const playerOffset =
        playerElement.offsetLeft + playerElement.offsetWidth / 2
      const scrollOffset = containerWidth / 2
      containerRef.current.scrollLeft = playerOffset - scrollOffset // this fixes the camera to opsition the character in the center
      //playerOffSet and scrollOffset are equal
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

        <Pipe />
        <div
          className='coin'
          style={{ gridColumn: '15 / span 1', gridRow: '5 / span 1' }}
        ></div>
      </div>
    </div>
  )
}

export default App
