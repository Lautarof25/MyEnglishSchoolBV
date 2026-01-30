const rounds = [
  ["Jump", "Run", "Jump", "Run"],
  ["Clap", "Apple", "Clap", "Apple"],
  ["Banana", "Banana", "Dog", "Dog"],
  ["Jump", "Run", "Jump", "Run"],
  ["Clap", "Apple", "Clap", "Apple"],
  ["Banana", "Banana", "Dog", "Dog"]
];

const emojiMap = {
  "Jump": "🤸",
  "Run": "🏃",
  "Clap": "👏",
  "Apple": "🍎",
  "Banana": "🍌",
  "Dog": "🐶"
};

const audioFiles = {
  "Jump": new Audio("/src/audio/jump.mp3"),
  "Run": new Audio("/src/audio/run.mp3"),
  "Clap": new Audio("/src/audio/clap.mp3"),
  "Apple": new Audio("/src/audio/apple.mp3"),
  "Banana": new Audio("/src/audio/banana.mp3"),
  "Dog": new Audio("/src/audio/dog.mp3")
};

const bgMusic = new Audio("/src/audio/music-kids-edited.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.3;

let isGameRunning = false;

function startGame(mode) {
  if (isGameRunning) return;
  isGameRunning = true;
  bgMusic.currentTime = 0;
  bgMusic.play().catch(e => console.log("Audio play failed:", e));

  const status = document.getElementById("game-status");
  const roundInfo = document.getElementById("game-round-info");
  const buttons = document.querySelectorAll(".game-btn");
  const boxes = [
    document.getElementById("box-0"),
    document.getElementById("box-1"),
    document.getElementById("box-2"),
    document.getElementById("box-3")
  ];

  buttons.forEach(btn => btn.disabled = true);

  let roundIndex = 0;

  function playRound() {
    if (roundIndex >= rounds.length) {
      status.innerText = "¡FELICITACIONES!";
      status.style.color = "var(--primary)";

      boxes.forEach((box, idx) => {
        box.innerHTML = `<img src="/src/images/buhowon.webp" alt="Winner Buho" class="winner-image">`;
        box.classList.remove("active");
      });

      roundInfo.innerText = "Ronda: 6 / 6";
      buttons.forEach(btn => btn.disabled = false);
      isGameRunning = false;
      bgMusic.pause();
      bgMusic.currentTime = 0;
      return;
    }

    roundInfo.innerText = `Ronda: ${roundIndex + 1} / 6`;

    // Preparar cajas para la ronda
    let roundWords = rounds[roundIndex];
    boxes.forEach((box, idx) => {
      box.classList.remove("active");
      const word = roundWords[idx];
      const emoji = emojiMap[word];

      if (mode === 'emojis') {
        box.innerHTML = `<span class="emoji">${emoji}</span>`;
      } else {
        box.innerHTML = `
          <span class="emoji">${emoji}</span>
          <span class="word">${word}</span>
        `;
      }
    });

    if (roundIndex === 3) {
      status.innerText = "¡MÁS RÁPIDO! ⚡";
      status.style.color = "var(--secondary)";
    } else if (roundIndex < 3) {
      status.innerText = "¡Escucha y repite!";
      status.style.color = "var(--primary)";
    }

    let delay = roundIndex < 3 ? 1000 : 500;
    let i = 0;

    let interval = setInterval(() => {
      // Quitar active de todas y poner en la actual
      boxes.forEach(box => box.classList.remove("active"));
      boxes[i].classList.add("active");

      let currentWord = roundWords[i];

      // Play Audio
      if (audioFiles[currentWord]) {
        audioFiles[currentWord].currentTime = 0;
        audioFiles[currentWord].play().catch(e => console.log(e));
      }

      i++;
      if (i >= roundWords.length) {
        clearInterval(interval);
        roundIndex++;
        // Quitar el último resaltado después del delay para que se note
        setTimeout(() => {
          boxes.forEach(box => box.classList.remove("active"));
        }, delay);
        setTimeout(playRound, 3000);
      }
    }, delay);
  }

  playRound();
}