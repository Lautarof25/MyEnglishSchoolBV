const questions = [
  {
    level: "A1",
    q: "I ____ usually have breakfast at 8:00 AM.",
    options: ["am not", "don't", "not", "doesn't"],
    correct: 1
  },
  {
    level: "A1",
    q: "Is this ____ book? I found it on the table.",
    options: ["mine", "yours", "your", "you"],
    correct: 2
  },
  {
    level: "A2",
    q: "She is very interested ____ learning more about British culture.",
    options: ["on", "in", "at", "for"],
    correct: 1
  },
  {
    level: "A2",
    q: "I ____ to the gym since last month because I've been busy.",
    options: ["didn't go", "haven't been", "wasn't", "don't go"],
    correct: 1
  },
  {
    level: "B1",
    q: "If I ____ more time, I would definitely travel around Europe.",
    options: ["had", "have", "would have", "will have"],
    correct: 0
  },
  {
    level: "B1",
    q: "I'm finally used to ____ early in the morning for my new job.",
    options: ["get up", "getting up", "to get up", "got up"],
    correct: 1
  },
  {
    level: "B2",
    q: "You ____ have told me you were struggling! I would have helped you.",
    options: ["must", "should", "might", "can"],
    correct: 1
  },
  {
    level: "B2",
    q: "I'd rather ____ tonight, if you don't mind. I'm quite tired.",
    options: ["don't go out", "not to go out", "not go out", "didn't go out"],
    correct: 2
  },
  {
    level: "C1",
    q: "Despite ____ hard for weeks, he didn't manage to pass the exam.",
    options: ["studying", "he studied", "to study", "that he studied"],
    correct: 0
  },
  {
    level: "C1",
    q: "It was only when he arrived home ____ he realized he had left his keys at work.",
    options: ["that", "when", "then", "than"],
    correct: 0
  },
  {
    level: "C2",
    q: "Under no circumstances ____ the door to strangers at night.",
    options: ["you should open", "should you open", "must you open", "you must open"],
    correct: 1
  },
  {
    level: "C2",
    q: "The atmosphere in the meeting was ____ with tension from the very beginning.",
    options: ["fraught", "caught", "brought", "fought"],
    correct: 0
  }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const testContainer = document.getElementById('test-container');
const startBtn = document.getElementById('start-test-btn');
const questionCard = document.getElementById('question-card');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressFill = document.getElementById('test-progress-fill');
const currentStepText = document.getElementById('current-step');
const resultCard = document.getElementById('result-card');
const levelResultText = document.getElementById('level-result');
const resultDescText = document.getElementById('result-desc');

if (startBtn) {
  startBtn.addEventListener('click', startTest);
}

function startTest() {
  document.getElementById('test-intro').classList.add('hidden');
  questionCard.classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestionIndex];
  questionText.textContent = q.q;
  optionsContainer.innerHTML = '';

  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = option;
    btn.onclick = () => selectOption(index);
    optionsContainer.appendChild(btn);
  });

  updateProgress();
}

function selectOption(index) {
  const q = questions[currentQuestionIndex];
  userAnswers.push(index);

  if (index === q.correct) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function updateProgress() {
  const progress = ((currentQuestionIndex) / questions.length) * 100;
  progressFill.style.width = `${progress}%`;
  currentStepText.textContent = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;
}

function showResults() {
  questionCard.classList.add('hidden');
  resultCard.classList.remove('hidden');

  const level = calculateLevel();
  levelResultText.textContent = `Tu nivel sugerido es: ${level}`;

  // Custom descriptions for levels
  const descriptions = {
    'A1': 'Tenés conocimientos muy básicos. ¡Es el momento perfecto para empezar a construir tu base!',
    'A2': 'Podés comunicarte en situaciones cotidianas sencillas. ¡Sigamos avanzando!',
    'B1': 'Tenés un nivel intermedio. Podés desenvolverte en la mayoría de las situaciones de viaje.',
    'B2': 'Tenés fluidez y podés comunicarte con hablantes nativos con naturality. ¡Casi experto!',
    'C1': 'Nivel avanzado. Podés expresar ideas complejas de forma espontánea.',
    'C2': 'Nivel de maestría. Comprendés con facilidad prácticamente todo lo que oís o leés.'
  };

  resultDescText.textContent = descriptions[level] || '¡Buen trabajo completando el test!';

  // Update WhatsApp button with level message
  const waBtn = document.getElementById('test-wa-btn');
  if (waBtn) {
    const message = encodeURIComponent(`¡Hola! Realicé el test de nivelación en su web y mi resultado fue nivel ${level}. Me gustaría recibir más información sobre sus cursos.`);
    waBtn.href = `https://wa.me/5491159917854?text=${message}`;
  }
}

function calculateLevel() {
  // Simple logic based on how many questions were correct and at what difficulty
  // 12 questions total. 2 for each level.
  // We can see the highest level where they got at least one question right, or just use a score threshold.

  if (score >= 11) return 'C2';
  if (score >= 9) return 'C1';
  if (score >= 7) return 'B2';
  if (score >= 5) return 'B1';
  if (score >= 3) return 'A2';
  return 'A1';
}

function restartTest() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  resultCard.classList.add('hidden');
  document.getElementById('test-intro').classList.remove('hidden');
}
