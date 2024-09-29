export function Player({ playerPosition, playerRef }: any) {
	return (
		<div
			ref={playerRef}
			className='player'
			style={{
				gridColumn: `${playerPosition.x + 1} / span 1`,
				gridRow: `${playerPosition.y + 1} / span 1`,
			}}
		></div>
	)
}
