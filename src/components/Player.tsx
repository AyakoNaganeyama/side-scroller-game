export function Player({ playerPosition, playerRef }: any) {
	return (
		<div
			ref={playerRef}
			className='player'
			style={{
				gridColumn: `${playerPosition.x + 1} / span 1`,
				gridRow: `${playerPosition.y + 1} / span 1`,
				...style.sprite,
			}}
		></div>
	)
}

const style = {
	sprite: {
		backgroundColor:
			'black' /* user color for now can change into a sprite later */,
		border: '2px solid white',
		transition: 'transform 0.1s',
	},
}
