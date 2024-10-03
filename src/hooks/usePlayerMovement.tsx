import { useEffect, useRef, useState } from 'react'

import { MAX_X, MIN_X, MAX_Y, MIN_Y, PIPE_COLLISION } from '../constants' // adjust the path based on your structure

interface PlayerPosition {
	x: number
	y: number
}

const MOVEMENT_COOL_DOWN = 40 // used to cap input spam, input only updated every 0.050 milliseconds
const JUMP_HEIGHT = 3
const FALL_DURATION = 1000 // time in milliseconds to fall back down
// add buffer between position update, else it looks player is teleporting when they jump and fall
const FRAME_TRANSITION_DURATION = FALL_DURATION / JUMP_HEIGHT

export function usePlayerMovement() {
	// values are equal to the grid where top left position is 0,0
	const [playerPosition, setPlayerPosition] = useState<PlayerPosition>({
		x: 0,
		y: 8, // start player at bottom left
	})
	const [isTouchingPipe, setIsTouchingPipe] = useState<boolean>(false)

	// used to stop user from back stepping outside of the map
	const backStepCount = useRef(0)
	const lastMoveTime = useRef(0) // used to track when the last input movement was
	const jumping = useRef(false) // tract jump state

	function checkIsTouchingPipe(x: number, y: number): boolean | null {
		return PIPE_COLLISION[`X${x}Y${y}`]
	}

	function handleKeyDown(event: KeyboardEvent) {
		const currentTime = Date.now()

		// check if moving too fast
		if (currentTime - lastMoveTime.current < MOVEMENT_COOL_DOWN) {
			return // return and ignore current input
		}

		// update last movement timestamp
		lastMoveTime.current = currentTime

		if (event.key === 'ArrowRight') {
			console.log('right arrow press')
			setPlayerPosition((prev) => ({
				...prev,
				x: checkIsTouchingPipe(prev.x + 1, prev.y)
					? prev.x
					: Math.min(prev.x + 1, MAX_X), // increment position, but don't exceed MAX_X
			}))

			if (backStepCount.current > 0) {
				backStepCount.current = backStepCount.current - 1
			}
			return
		}

		if (event.key === 'ArrowLeft' && backStepCount.current < 10) {
			setPlayerPosition((prev) => ({
				...prev,
				x: checkIsTouchingPipe(prev.x - 1, prev.y)
					? prev.x
					: Math.max(prev.x - 1, MIN_X), // decrement position, but no less than MIN_X
			}))

			backStepCount.current = backStepCount.current + 1
			return
		}

		// only allow if use is not already jumping
		if (event.key === 'ArrowUp' && !jumping.current) {
			jumping.current = true
			const originalY = playerPosition.y // store the original y position

			// jump up
			for (let i = 1; i <= JUMP_HEIGHT; i++) {
				setTimeout(() => {
					setPlayerPosition((prev) => ({
						...prev,
						y: Math.max(originalY - i, MIN_Y), // decrement y for jump but no less than min
					}))
				}, i * FRAME_TRANSITION_DURATION) // using frame_duration for jump
			}

			// after jump, fall back down
			setTimeout(() => {
				for (let i = 1; i <= JUMP_HEIGHT; i++) {
					setTimeout(() => {
						setPlayerPosition((prev) => ({
							...prev,
							y: Math.min(originalY - JUMP_HEIGHT + i, 8), // fall back to ground level
						}))
					}, i * FRAME_TRANSITION_DURATION) // using frame_duration for fall
				}
				jumping.current = false // reset jumping flag
			}, FALL_DURATION)
			return
		}

		if (event.key === 'ArrowDown') {
			setPlayerPosition((prev) => ({
				...prev,
				y: Math.min(prev.y + 1, MAX_Y), // increment y to move down
			}))
			return
		}
	}

	// add key press listener on mount and remove on cleanup dismount
	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	return { playerPosition }
}
