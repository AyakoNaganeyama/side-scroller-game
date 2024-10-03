import '../App.css'

export function Pipe() {
	return (
		<div
			style={{
				...style.sprite,
				...style.position,
			}}
		/>
	)
}

const style = {
	sprite: {
		backgroundColor: 'green' /* color for now can replace with sprite later */,
		border: '1px solid white',
	},
	position: {
		gridColumn: '10 / span 1',
		gridRow: '8 / span 2',
	},
}
