import { useEffect, useState } from 'react'
import { PlayerPosition } from '../hooks/usePlayerMovement'
import { COIN_COLLISION } from '../constants'

type CoinType = {
	column: string
	row: string
	playerPosition: PlayerPosition
}

export function Coin({ column, row, playerPosition }: CoinType) {
	const [isVisible, setIsVisible] = useState<boolean>(true)

	const style = {
		sprite: {
			backgroundColor: 'yellow' /* color for now can replace later */,
			border: '1px solid white',
			borderRadius: '50%',
		},
		position: { gridColumn: `${column} / span 1`, gridRow: `${row} / span 1` },
	}

	useEffect(() => {
		if (COIN_COLLISION[`X${playerPosition.x}Y${playerPosition.y}`])
			setIsVisible(false)
	}, [playerPosition])

	return isVisible ? (
		<div
			style={{
				...style.sprite,
				...style.position,
			}}
		/>
	) : null
}
