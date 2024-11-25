import React, { useRef, RefObject, useMemo, useEffect, useState } from 'react'

import { Coin } from './components/Coin'
import { Ground } from './components/Ground'
import { Pipe } from './components/Pipe'
import { Player } from './components/Player'

import { usePlayerMovement } from './hooks/usePlayerMovement'
import { useScrollEffect } from './hooks/useScrollEffect'

import {
	COIN_LOCATIONS,
	GROUND_LOCATIONS,
	PIPE_LOCATIONS,
	TOTAL_COLUMNS,
	TOTAL_ROWS,
	WIN_LOCATION,
} from './constants'

import './App.css'

export default function App() {
	const [gameOver, setGameOver] = useState<boolean>(false)
	// target player and camera as soon as app mounts to screen
	// used for tracking the player movement and to help keep scroll and camera inline with the player
	const cameraRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
	const playerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

	// player position is managed as soon as app mounts to screen
	// this includes all arrow key input action listeners
	const { playerPosition, playerDirection } = usePlayerMovement()
	// fires as soon as app mounts to screen, tracks and update scroll
	useScrollEffect(playerPosition, cameraRef, playerRef)

	const grounds = useMemo(() => {
		return GROUND_LOCATIONS.map(({ id, column }) => (
			<Ground key={id} column={column} />
		))
	}, [])

	const pipes = useMemo(() => {
		return PIPE_LOCATIONS.map(({ id, column }) => (
			<Pipe key={id} column={column} />
		))
	}, [])

	useEffect(() => {
		// if player falls in hole reset game
		if (playerPosition.y == 9) window.location.reload()
	}, [playerPosition.y])

	useEffect(() => {
		if (checkGameOVER(playerPosition.x)) {
			setGameOver(true)
		}
	}, [playerPosition])

	function checkGameOVER(x: number): boolean {
		return x >= WIN_LOCATION.MIN && x <= WIN_LOCATION.MAX
	}

	return gameOver ? (
		<div style={styles.winMessage}>
			<h1>You Win!</h1>
			<button onClick={() => window.location.reload()}>Play Again</button>
		</div>
	) : (
		<div style={styles.gameCamera} ref={cameraRef}>
			<div style={styles.mapGrid}>
				{COIN_LOCATIONS.map(({ id, column, row }) => (
					<Coin
						key={id}
						column={column}
						row={row}
						playerPosition={playerPosition}
					/>
				))}
				{pipes}
				{grounds}

				<Player
					playerPosition={playerPosition}
					playerRef={playerRef}
					playerDirection={playerDirection}
				/>
			</div>
		</div>
	)
}

const stretchMultiPlier = 5

const styles = {
	gameCamera: {
		width: '100%',
		height: '100vh',
		overflowX: 'scroll', // allows us to scroll left and right is there is any x overflow
		overflowY: 'hidden', // hide and disable up and down scroll
		whiteSpace: 'nowrap', // using grid so prevent any wrapping that may happen
	} as React.CSSProperties,
	mapGrid: {
		height: '100vh',
		width: `${TOTAL_COLUMNS * stretchMultiPlier}vw`, // auto fill width to match total columns
		backgroundColor: 'blue',
		display: 'grid',
		gridTemplateColumns: `repeat(${TOTAL_COLUMNS}, ${stretchMultiPlier}vw)`,
		gridTemplateRows: `repeat(${TOTAL_ROWS}, 1fr)`,
		position: 'relative',
	} as React.CSSProperties,
	winMessage: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		color: 'white',
		padding: '20px',
		borderRadius: '10px',
		textAlign: 'center',
		zIndex: 1000,
	} as React.CSSProperties,
}
