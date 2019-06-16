import { useState, useEffect } from "react";

const allLetters = "abcdefghijklmnopqrstuvwxyz".split("");

const randomLetter = (currentLetter = null) => {
  const filteredLetters = allLetters.filter(letter => {
    return letter !== currentLetter;
  });
  return filteredLetters[Math.floor(Math.random() * filteredLetters.length)];
};

function Letters({ audio, confetti }) {
  const [letter, setLetter] = useState(randomLetter());

  useEffect(() => {
    const handleKeydown = event => {
      if (event.key === letter) {
        confetti();
        audio.play("success");
        setLetter(randomLetter(letter));
        return;
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [letter]);

  return letter;
}

export default Letters;
