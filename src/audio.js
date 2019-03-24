import audioSrc from "./media/audio.mp3";
const audioPlayer = document.createElement("audio");
audioPlayer.src = audioSrc;

let currentSound = { start: 0, end: 0 };

audioPlayer.addEventListener(
  "timeupdate",
  function() {
    if (audioPlayer.currentTime > currentSound.end - 0.2) {
      audioPlayer.pause();
    }
  },
  false
);

export const sounds = {
  fail: {
    start: 0,
    end: 2
  },
  success: {
    start: 2,
    end: 4
  }
};

export function play({ start, end }) {
  currentSound = { start, end };
  audioPlayer.currentTime = currentSound.start;
  audioPlayer.play();
}
