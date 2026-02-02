const sentenceRounds = [
  "The cat is on the table",
  "I love learning English every day",
  "She speaks English very well"
];

let currentSentenceRound = 0;
let userSentence = [];
let targetSentence = [];

function startSentenceGame() {
  currentSentenceRound = 0;
  document.getElementById('start-sentence-btn').classList.add('hidden');
  document.getElementById('check-sentence-btn').classList.remove('hidden');
  document.getElementById('reset-sentence-btn').classList.remove('hidden');
  loadSentenceRound();
}

function loadSentenceRound() {
  if (currentSentenceRound >= sentenceRounds.length) {
    const status = document.getElementById('sentence-status');
    status.innerText = "¡FELICITACIONES! 🏆";
    status.style.color = "var(--primary)";
    document.getElementById('sentence-round-info').innerText = "Juego Completado";

    document.getElementById('start-sentence-btn').classList.remove('hidden');
    document.getElementById('start-sentence-btn').innerText = 'Jugar de nuevo 🔄';
    document.getElementById('check-sentence-btn').classList.add('hidden');
    document.getElementById('reset-sentence-btn').classList.add('hidden');
    return;
  }

  const rawSentence = sentenceRounds[currentSentenceRound];
  targetSentence = rawSentence.split(' ');
  const shuffledWords = [...targetSentence].sort(() => Math.random() - 0.5);

  userSentence = [];
  const status = document.getElementById('sentence-status');
  const roundInfo = document.getElementById('sentence-round-info');
  const pool = document.getElementById('sentence-words');
  const slots = document.getElementById('sentence-slots');

  status.innerText = "¡Ordena la oración!";
  status.style.color = "var(--secondary)";
  roundInfo.innerText = `Ronda: ${currentSentenceRound + 1} / 3`;

  slots.innerHTML = '<p class="placeholder-text">Selecciona las palabras de abajo</p>';
  pool.innerHTML = '';

  shuffledWords.forEach((word, index) => {
    const btn = document.createElement('div');
    btn.className = 'word-block';
    btn.innerText = word;
    btn.dataset.index = index;
    btn.onclick = () => addWordToSentence(btn, word);
    pool.appendChild(btn);
  });
}

function addWordToSentence(element, word) {
  element.classList.add('used');
  userSentence.push(word);

  const slots = document.getElementById('sentence-slots');
  if (userSentence.length === 1) slots.innerHTML = '';

  const wordEl = document.createElement('div');
  wordEl.className = 'word-block in-sentence';
  wordEl.innerText = word;
  wordEl.onclick = () => removeWordFromSentence(wordEl, word, element);
  slots.appendChild(wordEl);
}

function removeWordFromSentence(wordEl, word, originalBtn) {
  wordEl.remove();
  const index = userSentence.indexOf(word);
  if (index > -1) userSentence.splice(index, 1);

  originalBtn.classList.remove('used');

  if (userSentence.length === 0) {
    document.getElementById('sentence-slots').innerHTML = '<p class="placeholder-text">Selecciona las palabras de abajo</p>';
  }
}

function resetSentence() {
  loadSentenceRound();
}

function checkSentence() {
  const status = document.getElementById('sentence-status');

  if (userSentence.length < targetSentence.length) {
    status.innerText = "¡Faltan palabras!";
    status.style.color = "var(--secondary)";
    return;
  }

  const isCorrect = userSentence.join(' ') === targetSentence.join(' ');

  if (isCorrect) {
    status.innerText = "¡Correcto! ✨";
    status.style.color = "var(--primary)";

    setTimeout(() => {
      currentSentenceRound++;
      loadSentenceRound();
    }, 1500);
  } else {
    status.innerText = "Inténtalo de nuevo ❌";
    status.style.color = "var(--secondary)";

    // Visual feedback for error
    const slots = document.getElementById('sentence-slots');
    slots.style.animation = 'none';
    setTimeout(() => slots.style.animation = 'shake 0.5s ease-in-out', 10);
  }
}
