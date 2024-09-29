import { useEffect, RefObject } from 'react'

interface PlayerPosition {
	x: number
	y: number
}

export function useScrollEffect(
	playerPosition: PlayerPosition,
	containerRef: RefObject<HTMLDivElement>,
	playerRef: RefObject<HTMLDivElement>
) {
	// 1.Scroll the container to keep the player centered

	useEffect(() => {
		// useEffect can directly manupilate DOM
		if (containerRef.current && playerRef.current) {
			// access to container element
			const containerWidth = containerRef.current.offsetWidth // full width of the container
			const playerElement: HTMLDivElement | null = playerRef.current

			const playerOffset =
				playerElement.offsetLeft + playerElement.offsetWidth / 2
			const scrollOffset = containerWidth / 2
			containerRef.current.scrollLeft = playerOffset - scrollOffset

			// this fixes the camera to opsition the character in the center
			//playerOffSet and scrollOffset are equal
		}
	}, [playerPosition])
}
