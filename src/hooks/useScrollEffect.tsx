import { useEffect, useRef, RefObject } from 'react'

interface PlayerPosition {
	x: number
	y: number
}

export function useScrollEffect(
	playerPosition: PlayerPosition,
	cameraRef: RefObject<HTMLDivElement>,
	playerRef: RefObject<HTMLDivElement>
) {
	const lastCameraPosition = useRef(0)
	const gridCellWidth = 5 * (window.innerWidth / 100) // use to convert pixel position to grid position

	useEffect(() => {
		if (!cameraRef.current || !playerRef.current) return

		const cameraWidth = cameraRef.current.offsetWidth

		const playerGridPosition = playerPosition.x * gridCellWidth

		const cameraCenterPoint = cameraWidth / 2

		// move camera only if the player is past the halfway point
		const newScrollPosition = playerGridPosition - cameraCenterPoint

		// snap the scroll position to the grid cells not pixel point
		const snappedScrollPosition =
			Math.floor(newScrollPosition / gridCellWidth) * gridCellWidth

		// only update camera if player is moving forward and past half way point
		if (snappedScrollPosition > lastCameraPosition.current) {
			cameraRef.current.scrollLeft = snappedScrollPosition
			lastCameraPosition.current = snappedScrollPosition
		}
	}, [playerPosition])
}
