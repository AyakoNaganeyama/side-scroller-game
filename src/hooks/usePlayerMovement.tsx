import { useRef, useState } from 'react'

interface PlayerPosition {
	x: number
	y: number
}

// screen boundary
const MAX_X = 39 // rights side boundary
const MIN_X = 0 // left side boundary
const MAX_Y = 8 // bottom of screen because 0 is top left of screen in grid css
const MIN_Y = 0 // top of screen

export function usePlayerMovement() {
	// values are equal to the grid where top left position is 0,0
	const [playerPosition, setPlayerPosition] = useState<PlayerPosition>({
		x: 0,
		y: 8,
	})

	// used to stop user from back stepping outside of the map
	const backStepCount = useRef(0)

	// min max methods used to set cap on updates to keep play inside game
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'ArrowRight') {
			setPlayerPosition((prev) => ({
				...prev,
				x: Math.min(prev.x + 1, MAX_X),
			}))

			if (backStepCount.current > 0)
				backStepCount.current = backStepCount.current - 1
			return
		}

		if (event.key === 'ArrowLeft' && backStepCount.current < 10) {
			setPlayerPosition((prev) => ({
				...prev,
				x: Math.max(prev.x - 1, MIN_X),
			}))

			backStepCount.current = backStepCount.current + 1
			return
		}

		if (event.key === 'ArrowUp') {
			setPlayerPosition((prev) => ({
				...prev,
				// grid defaults to 0,0 being top left so need to decrement to move user up on screen
				y: Math.max(prev.y - 1, MIN_Y),
			}))
			return
		}

		if (event.key === 'ArrowDown') {
			setPlayerPosition((prev) => ({
				...prev,
				// grid defaults to 0,0 being top left so need to increment to move user down on screen
				y: Math.min(prev.y + 1, MAX_Y),
			}))
			return
		}
	}

	return { playerPosition, handleKeyDown }
}
