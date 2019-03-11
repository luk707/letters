import confetti from "canvas-confetti";

const confettiCanvas = document.getElementById("confetti");

const confettiCannon = confetti.create(confettiCanvas, { resize: true });

window.addEventListener("resize", () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});

export default confettiCannon;
