export function Coin() {
	return <div style={{ ...style.sprite, ...style.position }} />
}

const style = {
	sprite: {
		backgroundColor: 'yellow' /* color for now can replace later */,
		border: '1px solid white',
		borderRadius: '50%',
	},
	position: { gridColumn: '15 / span 1', gridRow: '5 / span 1' },
}
