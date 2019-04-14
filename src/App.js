import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import confettiCannon from "./confetti-cannon";
import audioSrc from "./media/audio.mp3";
import "./App.css";

const howler = new Howl({
  src: [audioSrc],
  sprite: {
    success: [2000, 4000]
  }
});

const allLetters = "abcdefghijklmnopqrstuvwxyz".split("");

const randomLetter = (currentLetter = null) => {
  const filteredLetters = allLetters.filter(letter => {
    return letter !== currentLetter;
  });
  return filteredLetters[Math.floor(Math.random() * filteredLetters.length)];
};

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
        howler.play("success");
        return;
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
