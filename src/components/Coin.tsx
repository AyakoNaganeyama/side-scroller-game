export function Coin({ column, row }: { column: string; row: string }) {
	const style = {
		sprite: {
			backgroundColor: 'yellow' /* color for now can replace later */,
			border: '1px solid white',
			borderRadius: '50%',
		},
		position: { gridColumn: `${column} / span 1`, gridRow: `${row} / span 1` },
	}

	return <div style={{ ...style.sprite, ...style.position }} />
}
