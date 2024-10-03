// global game fixed values
export const TOTAL_COLUMNS = 100 // set the width of the map
export const TOTAL_ROWS = 10 // set game sky height

export const MAX_X = TOTAL_COLUMNS - 1 // set right side boundary of map so player doesn't pop out of map when reaching the end
export const MIN_X = 0 // same as above set left side boundary so player doesn't pop out of the game when running back to start
export const MAX_Y = TOTAL_ROWS - 2 // bottom of screen, because 0 is top left of the screen in grid css
export const MIN_Y = 0 // top side boundary, prevent player from going past sky box
