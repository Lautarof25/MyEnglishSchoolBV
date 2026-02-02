const matchingRounds = [
  [
    { en: "Apple", es: "Manzana" },
    { en: "Book", es: "Libro" },
    { en: "Chair", es: "Silla" },
    { en: "Table", es: "Mesa" }
  ],
  [
    { en: "Cat", es: "Gato" },
    { en: "Dog", es: "Perro" },
    { en: "Bird", es: "Pájaro" },
    { en: "Fish", es: "Pez" }
  ],
  [
    { en: "Run", es: "Correr" },
    { en: "Jump", es: "Saltar" },
    { en: "Speak", es: "Hablar" },
    { en: "Eat", es: "Comer" }
  ]
];

let currentMatchingRound = 0;
let selectedEnglish = null;
let selectedSpanish = null;
let matchedCount = 0;
let isMatchingGameRunning = false;

function startMatchingGame() {
  if (isMatchingGameRunning && currentMatchingRound === 0) return;

  isMatchingGameRunning = true;
  currentMatchingRound = 0;
  matchedCount = 0;
  document.getElementById('start-matching-btn').style.display = 'none';
  loadMatchingRound();
}

function loadMatchingRound() {
  if (currentMatchingRound >= matchingRounds.length) {
    const status = document.getElementById('matching-status');
    status.innerText = "¡FELICITACIONES! 🎉";
    status.style.color = "var(--primary)";
    document.getElementById('matching-round-info').innerText = "Juego Completado";
    document.getElementById('start-matching-btn').style.display = 'inline-block';
    document.getElementById('start-matching-btn').innerText = 'Jugar de nuevo 🔄';
    isMatchingGameRunning = false;
    currentMatchingRound = 0;
    return;
  }

  const roundData = matchingRounds[currentMatchingRound];
  const englishCol = document.getElementById('english-column');
  const spanishCol = document.getElementById('spanish-column');
  const status = document.getElementById('matching-status');
  const roundInfo = document.getElementById('matching-round-info');

  status.innerText = "¡Une las parejas!";
  status.style.color = "var(--secondary)";
  roundInfo.innerText = `Ronda: ${currentMatchingRound + 1} / 3`;
  matchedCount = 0;
  selectedEnglish = null;
  selectedSpanish = null;

  // Shuffle arrays for columns
  const englishWords = [...roundData].sort(() => Math.random() - 0.5);
  const spanishWords = [...roundData].sort(() => Math.random() - 0.5);

  englishCol.innerHTML = '';
  spanishCol.innerHTML = '';

  englishWords.forEach(pair => {
    const div = document.createElement('div');
    div.className = 'match-item';
    div.innerText = pair.en;
    div.dataset.value = pair.en;
    div.onclick = () => selectWord(div, 'en');
    englishCol.appendChild(div);
  });

  spanishWords.forEach(pair => {
    const div = document.createElement('div');
    div.className = 'match-item';
    div.innerText = pair.es;
    div.dataset.value = pair.en; // Store the EN equivalent for easy check
    div.onclick = () => selectWord(div, 'es');
    spanishCol.appendChild(div);
  });
}

function selectWord(element, type) {
  if (element.classList.contains('matched')) return;

  if (type === 'en') {
    if (selectedEnglish) selectedEnglish.classList.remove('selected');
    selectedEnglish = element;
    element.classList.add('selected');
  } else {
    if (selectedSpanish) selectedSpanish.classList.remove('selected');
    selectedSpanish = element;
    element.classList.add('selected');
  }

  if (selectedEnglish && selectedSpanish) {
    checkMatch();
  }
}

function checkMatch() {
  const isMatch = selectedEnglish.dataset.value === selectedSpanish.dataset.value;

  if (isMatch) {
    selectedEnglish.classList.remove('selected');
    selectedSpanish.classList.remove('selected');
    selectedEnglish.classList.add('matched');
    selectedSpanish.classList.add('matched');

    selectedEnglish = null;
    selectedSpanish = null;
    matchedCount++;

    if (matchedCount === matchingRounds[currentMatchingRound].length) {
      setTimeout(() => {
        currentMatchingRound++;
        loadMatchingRound();
      }, 1000);
    }
  } else {
    const en = selectedEnglish;
    const es = selectedSpanish;
    en.classList.add('error');
    es.classList.add('error');

    selectedEnglish = null;
    selectedSpanish = null;

    setTimeout(() => {
      en.classList.remove('selected', 'error');
      es.classList.remove('selected', 'error');
    }, 500);
  }
}
