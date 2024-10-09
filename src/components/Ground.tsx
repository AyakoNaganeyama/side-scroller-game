export function Ground({ column }: { column: string }) {
	const style = {
		sprite: {
			backgroundColor: 'brown' /* color for now can use sprite later */,
			border: '1px solid white' /* for testing grid */,
			display: 'grid',
		},
		position: { gridColumn: `${column}`, gridRow: '10 / span 1' },
	}

	return <div style={{ ...style.sprite, ...style.position }}></div>
}
