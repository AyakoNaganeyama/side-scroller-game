import { v4 as uuidv4 } from 'uuid'

// global values for game

/**
 * Total columns in map (the width of the game map)
 */
export const TOTAL_COLUMNS = 100 // set the width of the map

/**
 * Set game sky height (the hight of screen)
 * If less than 10 there may be clipping and only cover half the screen
 */
export const TOTAL_ROWS = 10

/**
 * Set right side boundary of map so player doesn't pop out of map when reaching the end
 */
export const MAX_X = TOTAL_COLUMNS - 1

/**
 * Same as above set left side boundary so player doesn't pop out of the game when running back to start
 */
export const MIN_X = 0

/**
 * Ground bottom of screen is 8, because 0 is top left of the screen in grid css
 */
export const MAX_Y = TOTAL_ROWS - 2

/**
 * Top side boundary, prevent player from going past sky box
 */
export const MIN_Y = 0

/**
 * Pipe location uses an id to tract mapping during diffing in virtual dom
 */
type PipeLocationType = { id: string; column: string }
type CoinLocationType = { id: string; column: string; row: string }

/**
 * This pipe locations are used for visual placements of pipe sprites no used for collision
 */
export const PIPE_LOCATIONS: PipeLocationType[] = [
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

/**
 * Coin locations are used for visual placements of coin sprites no used for collision
 */
export const COIN_LOCATIONS: CoinLocationType[] = [
	{ id: uuidv4(), column: '22', row: '6' },
]

/**
 * Mapped out locations on grid where pipes are located,
 * by using PIPE_COLLISION[`X${playerPosition.x}Y${playerPosition.y}`],
 * true will be returned if player x and y has come into contact with a pipe
 */
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
