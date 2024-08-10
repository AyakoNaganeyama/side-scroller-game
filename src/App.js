import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Pipe from "./components/Pipe";
import Ground from "./components/Ground";
import Coin from "./components/Coin";
import Player from "./components/Player";
import usePlayerMovement from "./hooks/usePlayerMovement";
import useScrollEffect from "./hooks/useScrollEffect";

const App = () => {
  
 // 1.Add event listener for keydown events
 //so that Everytime key is pressed, handle keydown is triggred and changes position 
 useEffect(() => {
  window.addEventListener("keydown", handleKeyDown);
  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, []);

//import use state and function from use hook 
const { playerPosition, handleKeyDown } = usePlayerMovement();

  // References to the player element and the container
  const playerRef = useRef(null); // reference to the player in the DOM
  const containerRef = useRef(null); // reference to the container in the DOM

  // calling hook useScrollEffect, everytime App.js is rendered this is called and triggers useEffect inside the hook 
 useScrollEffect(playerPosition, containerRef, playerRef); 
    




  

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
