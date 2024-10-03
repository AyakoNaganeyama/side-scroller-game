import React, { useEffect, useRef, RefObject } from 'react'
import './App.css'
import { Pipe } from './components/Pipe'
import { Ground } from './components/Ground'
import { Coin } from './components/Coin'
import { Player } from './components/Player'
import { usePlayerMovement } from './hooks/usePlayerMovement'
import { useScrollEffect } from './hooks/useScrollEffect'
import { TOTAL_COLUMNS, TOTAL_ROWS } from './constants'

export default function App() {
	// player position is managed as soon as app launches
	// this includes all arrow key input action listeners
	const { playerPosition } = usePlayerMovement()
	// target dom elements
	const playerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
	const cameraRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

	// fires as soon as app launches, tracks and update scroll
	useScrollEffect(playerPosition, cameraRef, playerRef)

	return (
		<div style={styles.gameCamera} ref={cameraRef}>
			<div style={styles.mapGrid}>
				<Ground />

				<Pipe />
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
