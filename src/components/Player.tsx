import { useEffect } from 'react'
import IdleSprite from '../images/character/pink-man/idle.png'
import RunningSprite from '../images/character/pink-man/run.png'

export function Player({ playerPosition, playerRef }: any) {
	// Add the keyframes into the DOM
	useEffect(() => {
		const styleSheet = document.styleSheets[0]
		const idleKeyframes = `@keyframes idle { to { background-position: -352px; } }`
		const runKeyframes = `@keyframes run { to { background-position: -384px; } }`

		styleSheet.insertRule(idleKeyframes, styleSheet.cssRules.length)
		styleSheet.insertRule(runKeyframes, styleSheet.cssRules.length)
	}, [])

	const animateSprite: { [key: string]: string } = {
		idle: 'idle 1s steps(2) infinite', // 11 frames for idle
		running: 'run 1s steps(12) infinite', // 12 frames for running
	}

	return (
		<div
			ref={playerRef}
			className='player'
			style={{
				gridColumn: `${playerPosition.x + 1} / span 1`,
				gridRow: `${playerPosition.y + 1} / span 1`,
				...style.sprite,
			}}
		/>
	)
}

const style = {
	sprite: {
		backgroundImage: `url(${IdleSprite})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		border: '2px solid white',
		transition: 'transform 0.4s',
	},
}
