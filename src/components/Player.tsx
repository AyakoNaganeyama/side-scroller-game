import { useEffect } from 'react'
import IdleSprite from '../images/character/pink-man/idle.png'
import { LEFT } from '../constants'

export function Player({ playerPosition, playerRef, playerDirection }: any) {
	// Add the keyframes into the DOM
	useEffect(() => {
		const styleSheet = document.styleSheets[0]
		const idleKeyframes = `@keyframes idle { to { background-position: 31%; } }`
		styleSheet.insertRule(idleKeyframes, styleSheet.cssRules.length)
	}, [])

	const style = {
		sprite: {
			backgroundImage: `url(${IdleSprite})`,
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			transform: playerDirection == LEFT ? 'scaleX(-1)' : 'scaleX(1)', // flip sprite left and right
		},
	}

	return (
		<div
			ref={playerRef}
			className='player'
			style={{
				gridColumn: `${playerPosition.x + 1} / span 1`,
				gridRow: `${playerPosition.y + 1} / span 1`,
				...style.sprite,
				animation: 'idle 1s steps(2) infinite',
			}}
		/>
	)
}
