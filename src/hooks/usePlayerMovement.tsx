import { useEffect, useRef, useState } from 'react'

import { MAX_X, MIN_X, MAX_Y, MIN_Y } from '../constants' // Adjust the path based on your structure

interface PlayerPosition {
	x: number
	y: number
}

const MOVEMENT_COOL_DOWN = 40 // used to cap input spam, input only updated every 0.050 milliseconds

export function usePlayerMovement() {
	// values are equal to the grid where top left position is 0,0
	const [playerPosition, setPlayerPosition] = useState<PlayerPosition>({
		x: 0,
		y: 8,
	})

	// used to stop user from back stepping outside of the map
	const backStepCount = useRef(0)
	const lastMoveTime = useRef(0) // used to track when the last input movement was

	// min max methods used to set cap on updates to keep play inside game
	function handleKeyDown(event: KeyboardEvent) {
		const currentTime = Date.now()

		// check if moving too fast
		if (currentTime - lastMoveTime.current < MOVEMENT_COOL_DOWN) {
			return // return and ignore current input
		}

		// update last movement timestamp
		lastMoveTime.current = currentTime

		if (event.key === 'ArrowRight') {
			setPlayerPosition((prev) => ({
				...prev,
				x: Math.min(prev.x + 1, MAX_X),
			}))

			if (backStepCount.current > 0) {
				backStepCount.current = backStepCount.current - 1
			}
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

	//add key press listener on mount and remove on cleanup dismount
	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	return { playerPosition }
}
