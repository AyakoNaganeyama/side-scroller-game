import '../App.css'

export function Ground() {
	return <div style={{ ...style.sprite, ...style.position }}></div>
}

const style = {
	sprite: {
		backgroundColor: 'brown' /* color for now can use sprite later */,
		border: '1px solid white' /* for testing grid */,
		gridColumn: '1 / -1' /* ground position on grid */,
	},
	position: { gridColumn: '1 / -1', gridRow: '10 / span 1' },
}
