import { useEffect, useRef, useState } from 'react'

import {
	GROUND_HOLD_LOCATION,
	MAX_X,
	MAX_Y,
	MIN_X,
	MIN_Y,
	PIPE_COLLISION,
} from '../constants' // adjust the path based on your structure

/**
 * X is is column and Y is row
 */
export interface PlayerPosition {
	x: number
	y: number
}

const MOVEMENT_COOL_DOWN = 40 // used to cap input spam, input only updated every 0.040 milliseconds
const JUMP_HEIGHT = 3
const FALL_DURATION = 900 // time in milliseconds to fall back down
// add buffer between position update, else it looks player is teleporting when they jump and fall
const FRAME_TRANSITION_DURATION = FALL_DURATION / JUMP_HEIGHT

export function usePlayerMovement() {
	// values are equal to the grid where top left position is 0,0
	const [playerPosition, setPlayerPosition] = useState<PlayerPosition>({
		x: 0,
		y: MAX_Y, // start player at bottom left
	})

	// used to stop user from back stepping outside of the map
	const backStepCount = useRef(0)
	const lastMoveTime = useRef(0) // used to track when the last input movement was
	const jumping = useRef(false) // tract jump state

	function checkTouchingPipe(x: number, y: number): boolean | null {
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
			setPlayerPosition((prev) => {
				const oldX = prev.x
				const newX = oldX + 1

				// prevent users from moving once in hole
				if (GROUND_HOLD_LOCATION[oldX] && prev.y == 9) {
					return { x: oldX, y: prev.y }
				}

				// check if new position will land above hole in ground if so then fall
				if (GROUND_HOLD_LOCATION[newX] && prev.y == 8) {
					fall(9, 1)
					return { x: newX, y: prev.y }
				}

				if (prev.y == 6 && !jumping.current) fall(MAX_Y, 2)

				return {
					//  increment position, but don't exceed MAX_X
					x: checkTouchingPipe(newX, prev.y) ? oldX : Math.min(newX, MAX_X),
					y: prev.y,
				}
			})

			if (backStepCount.current > 0) {
				backStepCount.current = backStepCount.current - 1
			}

			return
		}

		if (event.key === 'ArrowLeft' && backStepCount.current < 10) {
			setPlayerPosition((prev) => {
				const oldX = prev.x
				const newX = oldX - 1

				// prevent users from moving once in hole
				if (GROUND_HOLD_LOCATION[oldX] && prev.y == 9) {
					return { x: oldX, y: prev.y }
				}

				// check if new position will land above hole in ground if so then fall
				if (GROUND_HOLD_LOCATION[newX] && prev.y == 8) {
					fall(9, 1)
					return { x: newX, y: prev.y }
				}

				if (prev.y == 6 && !jumping.current) fall(MAX_Y, 2)

				return {
					...prev,
					x: checkTouchingPipe(newX, prev.y) ? oldX : Math.max(newX, MIN_X), // decrement position, but no less than MIN_X
				}
			})

			backStepCount.current = backStepCount.current + 1
			return
		}

		// only allow if use is not already jumping
		if (event.key === 'ArrowUp' && !jumping.current) {
			jumping.current = true

			// jump up
			for (let i = 1; i <= JUMP_HEIGHT; i++) {
				setTimeout(() => {
					setPlayerPosition((prev) => ({
						...prev,
						y: Math.max(MAX_Y - i, MIN_Y), // decrement y for jump but no less than min
					}))

					// timeout background process workaround
					// only fall at the end of loop
					if (i === JUMP_HEIGHT) {
						fall(MAX_Y, JUMP_HEIGHT)
					}
				}, i * FRAME_TRANSITION_DURATION) // using frame_duration for jump
			}

			return
		}

		function fall(originalY: number, height: number) {
			for (let i = 1; i <= height; i++) {
				setTimeout(() => {
					setPlayerPosition((prev) => {
						const newY = originalY - height + i

						// prevent users from jumping once in hole
						if (GROUND_HOLD_LOCATION[prev.x] && prev.y == 9) {
							return { x: prev.x, y: prev.y }
						}

						// check if new position will land above hole in ground if so then fall
						if (GROUND_HOLD_LOCATION[prev.x] && originalY - height + i == 8) {
							fall(9, 1)
							return { x: prev.x, y: newY }
						}

						return {
							...prev,
							y: checkTouchingPipe(prev.x, originalY - height + i)
								? prev.y
								: Math.min(
										originalY - height + i,
										originalY == MAX_Y ? MAX_Y : 9 // fall back to ground level else fall to hole level
								  ),
						}
					})

					// check on last loop then set jump state to false
					// must be in timeout
					if (i === height) jumping.current = false
				}, (i * FRAME_TRANSITION_DURATION) / 2) // using frame_duration for fall
			}
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
