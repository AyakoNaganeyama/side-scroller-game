import React, { useRef, RefObject } from 'react'

import { Pipe } from './components/Pipe'
import { Ground } from './components/Ground'
import { Coin } from './components/Coin'
import { Player } from './components/Player'
import { usePlayerMovement } from './hooks/usePlayerMovement'
import { useScrollEffect } from './hooks/useScrollEffect'

import { TOTAL_COLUMNS, TOTAL_ROWS, PIPE_LOCATIONS } from './constants'

import './App.css'

export default function App() {
	// player position is managed as soon as app mounts to screen
	// this includes all arrow key input action listeners
	const { playerPosition } = usePlayerMovement()

	// target player and camera as soon as app mounts to screen
	// used for tracking the player movement and to help keep scroll and camera inline with the player
	const playerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
	const cameraRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

	// fires as soon as app mounts to screen, tracks and update scroll
	useScrollEffect(playerPosition, cameraRef, playerRef)

	return (
		<div style={styles.gameCamera} ref={cameraRef}>
			<div style={styles.mapGrid}>
				<Ground />

				{PIPE_LOCATIONS.map((pipe) => (
					<Pipe key={pipe.id} column={pipe.column} />
				))}
				<Coin />
				<Player playerPosition={playerPosition} playerRef={playerRef} />
			</div>
		</div>
	)
}

const styles = {
	gameCamera: {
		width: '100%',
		height: '100vh',
		overflowX: 'scroll',
		overflowY: 'hidden',
		whiteSpace: 'nowrap',
	} as React.CSSProperties,
	mapGrid: {
		height: '100vh',
		width: `${TOTAL_COLUMNS * 5}vw`, // auto fill width to match total columns
		backgroundColor: 'blue',
		display: 'grid',
		gridTemplateColumns: `repeat(${TOTAL_COLUMNS}, 5vw)`,
		gridTemplateRows: `repeat(${TOTAL_ROWS}, 10vh)`,
		position: 'relative',
	} as React.CSSProperties,
}
