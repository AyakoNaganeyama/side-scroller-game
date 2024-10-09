import '../App.css'

export function Pipe({ column }: { column: string }) {
	return (
		<div
			style={{
				display: 'grid',
				gridColumn: `${column} / span 1`,
				gridRow: '8 / span 2',
				...style.sprite,
			}}
		/>
	)
}

const style = {
	sprite: {
		backgroundColor: 'green' /* color for now can replace with sprite later */,
		border: '1px solid white',
	},
}
