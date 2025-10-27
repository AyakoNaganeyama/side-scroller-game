# to-do-list-app

## About

The primary objective is to develop a single-level side-scrolling game prototype inspired by classic Mario games using pure ReactJs and explore the feasibility of modern web technologies in game development. This project aims to demonstrate core game mechanics such as player movement, camera scrolling, coin collection and game over. <br />

## Technologies

CSS grid:​

Game layout​

ReactJs:​

Manage Enity

![alt text](image-1.png)
Everything has a position, for example
the the player is at column 1, row 8 and
the first pipe location is column 7, row 8.​

</br>

## Key Featurs

-Player movement, jump and fall<br />

-Camera scroll​<br />

-Collision detection ​<br />

-Coin collision​<br />

-Game over<br /><br />

## Entities

![alt text](entity.jpg)<br/>

## Archtecture Diagram

As seen below the game consists of three layers, the presentation layer, entity layer and logic controller layer that can be seen as the Input layer.

![alt text](./archtecture.jpg)<br />

## Camera Scroll Diagram

The camera scroll consists of three main components, the camera, the overflowing x-axis and the overflow itself.

![alt text](./camera.jpg)

## Output

1. **Player movement**: </br>
   The game is built on a CSS grid where we allocate a position on the grid for the player. When a player moves forward or back, we add 1 or take one away, to allow the player to move forward one grid cell or back one grid cell. </br>The player movement controller takes an event argument which checks what type of event occurred, in this case, we check for the left, right, and up arrow keys. These keys will be used for player movement. From here we set the player's position and return it to update the player object position as seen below in the code sample.
   ![alt text](./player_movement.jpg)

2. **Jumping mechanics**:</br>
   Here we have implemented a simple jump mechanic. When the user clicks the up-arrow key, the player is moved up 3 spaces then back down 3 spaces creating a jump action.

3. **Coin collection**:
   we check if the player has the same location as the coin. We do this by checking the player’s position against the coin locations which is stored in our constants file as COIN_COLLISION. If it returns true we remove the coin from the view by returning null.

4. **Collision detection**:
   Similar to coin collection, collision detection uses position mapping as well to check if there is a pipe ahead or behind the play. This will prevent the player from moving.

5. **Game over loss**:we are using the “useEffect” callback function to actively listen and check the player's position x.
