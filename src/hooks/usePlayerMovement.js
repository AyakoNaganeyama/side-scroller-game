import React from 'react'
import { useState } from 'react'

function usePlayerMovement() {

    // State to track the player's position on the grid
    const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 4 }); // initial position

      // 1.Function to handle key press events for player movement, at the moemnt you move +1 from the previous position
    const handleKeyDown = (event) => {
        switch (event.key) {
          case "ArrowRight":
            setPlayerPosition((prev) => ({ ...prev, x: Math.min(prev.x + 1, 39) })); // Move right, limit to column 39
            break;
          case "ArrowLeft":
            setPlayerPosition((prev) => ({ ...prev, x: Math.max(prev.x - 1, 0) })); // Move left, limit to column 0
            break;
          case "ArrowUp":
            setPlayerPosition((prev) => ({ ...prev, y: Math.max(prev.y - 1, 0) })); // Move up, limit to row 0
            break;
          case "ArrowDown":
            setPlayerPosition((prev) => ({ ...prev, y: Math.min(prev.y + 1, 9) })); // Move down, limit to row 9
            break;
          default:
            break;
        }
      };


  return {playerPosition, handleKeyDown };
  
}

export default usePlayerMovement