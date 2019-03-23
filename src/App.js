import React, { useState, useEffect } from "react";
import confettiCannon from "./confetti-cannon";
import "./App.css";

const allLetters = "abcdefghijklmnopqrstuvwxyz".split("");

const randomLetter = (currentLetter = null) =>
  allLetters.filter(letter => letter !== currentLetter)[Math.floor(Math.random() * allLetters.length)];

function App() {
  const [letter, setLetter] = useState(randomLetter());
  useEffect(() => {
    const handleKeydown = event => {
      if (event.key === letter) {
        confettiCannon({
          particleCount: 100,
          spread: 160
          // any other options from the global
          // confetti function
        });
        setLetter(randomLetter(letter));
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  });
  return (
    <div className="App">
      <span>{letter}</span>
    </div>
  );
}

export default App;
