export function Cloud({ column, row }: { column: string; row: string }) {
	const style = {
		gridColumn: column,
		gridRow: row,
		backgroundColor: 'white',
		width: '100%',
		height: '100%',
		boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
	}

	return <div style={style}></div>
}
