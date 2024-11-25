import '../App.css'
import groundURL from '../images/box/Box.png'

export function Ground({ column }: { column: string }) {
	const style = {
		sprite: {
			backgroundImage: `url(${groundURL})`,
			backgroundPosition: 'center',
			border: '1px solid white',
			display: 'grid',
			boxShadow: '0 4px 6px rgba(0, 0, 0, 5)',
		},
		position: {
			gridColumn: `${column}`,
			gridRow: '10 / span 1',
		},
	}

	return <div style={{ ...style.sprite, ...style.position }}></div>
}
