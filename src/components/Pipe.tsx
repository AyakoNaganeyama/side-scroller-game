import '../App.css'
import pipeURL from '../images/pipe/Pipe.png'

export function Pipe({ column }: { column: string }) {
	return (
		<div
			style={{
				display: 'grid',
				gridColumn: `${column} / span 1`,
				gridRow: '8 / span 2',
				boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',

				...style.sprite,
			}}
		/>
	)
}

const style = {
	sprite: {
		backgroundImage: `url(${pipeURL})`,
		backgroundPosition: 'center',
		border: '1px solid white',
		width: '100%',
		height: '100%',
	},
}
