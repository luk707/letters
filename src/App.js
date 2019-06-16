import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import confettiCannon from "./confetti-cannon";
import audioSrc from "./media/audio.mp3";
import Letters from "./screens/Letters";
import Menu from "./screens/Menu";
import Words from "./screens/Words";
import "./App.css";

const howler = new Howl({
  src: [audioSrc],
  sprite: {
    success: [2000, 4000]
  }
});

const confetti = () =>
  confettiCannon({
    particleCount: 100,
    spread: 160
  });

const screens = {
  menu: Menu,
  letters: Letters,
  words: Words
};

const screenNames = Object.keys(screens);

const getInitialScreen = () => {
  const savedScreen = localStorage.getItem("screen") || "menu";
  if (screenNames.includes(savedScreen)) {
    return savedScreen;
  }
  return "menu";
};

function App() {
  const [screen, setScreen] = useState(getInitialScreen);
  useEffect(() => {
    localStorage.setItem("screen", screen);
  }, [screen]);
  const Screen = screens[screen];
  return (
    <div className={`App ${screen}`}>
      {screen !== "menu" && (
        <button className="menuButton" onClick={() => setScreen("menu")}>
          Menu
        </button>
      )}
      <Screen
        audio={howler}
        screenName={screen}
        screenNames={screenNames}
        setScreen={setScreen}
        confetti={confetti}
      />
    </div>
  );
}

export default App;
