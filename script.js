const welcomeDialog = document.querySelector("#welcome-dialog");
welcomeDialog.showModal();

const activateButton = document.querySelector(".activate-button");
const cardStatus = document.querySelector(".card-status");

activateButton.addEventListener("click", () => {
  const isActive = activateButton.getAttribute("aria-pressed") === "true";
  activateButton.setAttribute("aria-pressed", String(!isActive));
  activateButton.firstChild.textContent = isActive
    ? "Activate ability "
    : "Ability activated ";
  cardStatus.textContent = isActive
    ? "Your next adventure is waiting."
    : "Unstoppable Curiosity is ready for action!";
});

// Each answer adds one point to its matching personality type.
const questions = [
  {
    question: "How would you spend a free afternoon?",
    answers: [
      { text: "Go on an adventure somewhere sunny", type: "Fire" },
      { text: "Relax by the water with a good playlist", type: "Water" },
      { text: "Take care of plants or explore a park", type: "Grass" },
      { text: "Find a concert, game, or something exciting", type: "Electric" }
    ]
  },
  {
    question: "Plans suddenly change. What do you do?",
    answers: [
      { text: "Make it a spontaneous road trip!", type: "Fire" },
      { text: "Go with the flow and see what happens", type: "Water" },
      { text: "Improvise something completely unexpected", type: "Chaos" },
      { text: "Grab a coffee and make a new plan", type: "Coffee" }
    ]
  },
  {
    question: "Pick your ideal sidekick skill.",
    answers: [
      { text: "Help everyone feel calm and understood", type: "Water" },
      { text: "Know exactly how to help things grow", type: "Grass" },
      { text: "Bring the energy whenever it is needed", type: "Electric" },
      { text: "Turn an ordinary day into a wild story", type: "Chaos" }
    ]
  },
  {
    question: "What helps you get through a busy day?",
    answers: [
      { text: "A bold goal to charge toward", type: "Fire" },
      { text: "A quiet moment to reset", type: "Grass" },
      { text: "A fresh cup of coffee or tea", type: "Coffee" },
      { text: "A burst of music and movement", type: "Electric" }
    ]
  },
  {
    question: "Choose a tiny everyday superpower.",
    answers: [
      { text: "Always know the right thing to say", type: "Water" },
      { text: "Make any space feel cozy and alive", type: "Grass" },
      { text: "Get a surprise plot twist whenever life feels dull", type: "Chaos" },
      { text: "Have your favorite drink appear right on time", type: "Coffee" }
    ]
  }
];

const typeNames = ["Fire", "Water", "Grass", "Electric", "Chaos", "Coffee"];
const quizStart = document.querySelector("#quiz-start");
const quizSection = document.querySelector(".quiz-section");
const cardScene = document.querySelector(".card-scene");
const quizPanel = document.querySelector("#quiz-panel");
const quizProgress = document.querySelector("#quiz-progress");
const quizQuestion = document.querySelector("#quiz-question");
const quizOptions = document.querySelector("#quiz-options");
const quizResult = document.querySelector("#quiz-result");
const quizRestart = document.querySelector("#quiz-restart");

let currentQuestion = 0;
let scores = {};

// Show a question and make one button for each possible answer.
function showQuestion() {
  const question = questions[currentQuestion];
  quizProgress.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  quizQuestion.textContent = question.question;
  quizOptions.replaceChildren();
  quizResult.textContent = "";

  question.answers.forEach((answer) => {
    const option = document.createElement("button");
    option.className = "quiz-option";
    option.type = "button";
    option.textContent = answer.text;
    option.addEventListener("click", () => chooseAnswer(answer.type));
    quizOptions.appendChild(option);
  });

  // Keep keyboard users focused on the available answers.
  quizOptions.firstElementChild.focus();
}

// Record the answer, then show the next question or the result.
function chooseAnswer(type) {
  scores[type] += 1;
  currentQuestion += 1;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// Find the type with the most points and display the quiz result.
function showResult() {
  const winningType = typeNames.reduce((winner, type) =>
    scores[type] > scores[winner] ? type : winner
  );

  quizProgress.textContent = "Quiz complete!";
  quizQuestion.textContent = "Your personality type is...";
  quizOptions.replaceChildren();
  quizResult.textContent = `${winningType}! Try Again?`;
  quizRestart.hidden = false;
  quizRestart.focus();
}

// Start over with five fresh questions and empty scores.
function startQuiz() {
  currentQuestion = 0;
  scores = Object.fromEntries(typeNames.map((type) => [type, 0]));
  quizRestart.hidden = true;
  quizPanel.hidden = false;
  showQuestion();
}

quizStart.addEventListener("click", startQuiz);
quizRestart.addEventListener("click", startQuiz);

// Close the quiz when a click happens outside its section.
document.addEventListener("click", (event) => {
  const clickPath = event.composedPath();
  const clickedInsideQuiz = clickPath.includes(quizSection);
  const clickedInsideCard = clickPath.includes(cardScene);

  if (!clickedInsideQuiz && !clickedInsideCard) {
    quizPanel.hidden = true;
  }
});
