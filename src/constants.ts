import { v4 as uuidv4 } from 'uuid'

// global game fixed values
export const TOTAL_COLUMNS = 100 // set the width of the map
export const TOTAL_ROWS = 10 // set game sky height
export const GROUND_ROW = 8

export const MAX_X = TOTAL_COLUMNS - 1 // set right side boundary of map so player doesn't pop out of map when reaching the end
export const MIN_X = 0 // same as above set left side boundary so player doesn't pop out of the game when running back to start
export const MAX_Y = TOTAL_ROWS - 2 // bottom of screen, because 0 is top left of the screen in grid css
export const MIN_Y = 0 // top side boundary, prevent player from going past sky box

export const PIPE_LOCATIONS = [
	{ id: uuidv4(), column: '8' },
	{ id: uuidv4(), column: '15' },
	{ id: uuidv4(), column: '21' },
	{ id: uuidv4(), column: '35' },
	{ id: uuidv4(), column: '46' },
	{ id: uuidv4(), column: '52' },
	{ id: uuidv4(), column: '64' },
	{ id: uuidv4(), column: '75' },
	{ id: uuidv4(), column: '82' },
	{ id: uuidv4(), column: '97' },
]

export const PIPE_COLLISION: { [key: string]: boolean } = {
	X7Y8: true,
	X7Y7: true,
	X14Y8: true,
	X14Y7: true,
	X20Y8: true,
	X20Y7: true,
	X34Y8: true,
	X34Y7: true,
	X45Y8: true,
	X45Y7: true,
	X51Y8: true,
	X51Y7: true,
	X63Y8: true,
	X63Y7: true,
	X74Y8: true,
	X74Y7: true,
	X81Y8: true,
	X81Y7: true,
	X96Y8: true,
	X96Y7: true,
}
