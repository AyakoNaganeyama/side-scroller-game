import React, { useEffect, useRef, RefObject } from 'react'
import './App.css'
import { Pipe } from './components/Pipe'
import { Ground } from './components/Ground'
import { Coin } from './components/Coin'
import { Player } from './components/Player'
import { usePlayerMovement } from './hooks/usePlayerMovement'
import { useScrollEffect } from './hooks/useScrollEffect'

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
		<div className='gameCamera' ref={cameraRef}>
			<div className='mapGrid'>
				<Ground />

				<Pipe />
				<Coin />
				<Player playerPosition={playerPosition} playerRef={playerRef} />
			</div>
		</div>
	)
}
