import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Pipe from "./components/Pipe";
import Ground from "./components/Ground";
import Coin from "./components/Coin";
import Player from "./components/Player";
import usePlayerMovement from "./hooks/usePlayerMovement";

const App = () => {
  
 // get position and function 
 const [playerPosition, handleKeyDown ] = usePlayerMovement(); 

  // References to the player element and the container
  const playerRef = useRef(null); // reference to the player in the DOM
  const containerRef = useRef(null); // reference to the container in the DOM





  // 1.Add event listener for keydown events
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // 1.Scroll the container to keep the player centered
  useEffect(() => {
    // useEffect can directly manupilate DOM
    if (containerRef.current) {
      // access to container element
      const containerWidth = containerRef.current.offsetWidth; // full width of the container
      const playerElement = playerRef.current;
      const playerOffset =
        playerElement.offsetLeft + playerElement.offsetWidth / 2;
      const scrollOffset = containerWidth / 2;
      containerRef.current.scrollLeft = playerOffset - scrollOffset; // this fixes the camera to opsition the character in the center
      //playerOffSet and scrollOffset are equal
    }
  }, [playerPosition]);

  return (
    <div className="game-container" ref={containerRef}>
      <div className="background-grid">
      
        {/* Add ground, pipe, and coin elements */}
        <Ground />

        <Pipe />
        <Coin />
        <Player playerPosition = {playerPosition} playerRef = {playerRef}/>
      </div>
    </div>
  );
};

export default App;
