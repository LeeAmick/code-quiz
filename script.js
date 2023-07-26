// Array to store quiz questions and answers
const questions = [
  {
    question: "What does HTML stand for?",
    choices: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Transfer Markup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which tag is used to define an unordered list in HTML?",
    choices: ["<ol>", "<dl>", "<ul>", "<list>"],
    answer: "<ul>"
  },
  {
    question: "Which CSS property is used to change the text color of an element?",
    choices: ["text-color", "color", "font-color", "text-style"],
    answer: "color"
  },
  {
    question: "In JavaScript, which keyword is used to declare a variable?",
    choices: ["var", "variable", "let", "const"],
    answer: "var"
  }
];

// References to elements in the HTML
const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const resultElement = document.getElementById("result");
const timeLeftElement = document.getElementById("time-left");

// Variables to keep track of quiz state
let currentQuestionIndex = 0;
let timeLeft = 60;
let timer;

// Event listener for the "Start Quiz" button
startBtn.addEventListener("click", startQuiz);

// Function to start the quiz
function startQuiz() {
  // Hide the "Start Quiz" button
  startBtn.style.display = "none";
  // Show the quiz container
  quizContainer.style.display = "block";
  // Display the first question
  showQuestion();
  // Start the timer
  startTimer();
  // Update the timer display
  updateTimerDisplay();
}

// Function to display a question and its choices
function showQuestion() {
  // Get the current question from the questions array
  const question = questions[currentQuestionIndex];
  // Display the question text
  questionElement.textContent = question.question;
  // Clear previous choices
  choicesElement.innerHTML = "";

  // Create buttons for each choice and add event listener to check the answer
  question.choices.forEach(choice => {
    const choiceBtn = document.createElement("button");
    choiceBtn.textContent = choice;
    choiceBtn.addEventListener("click", checkAnswer);
    choicesElement.appendChild(choiceBtn);
  });
}

// Function to check the user's answer
function checkAnswer(event) {
  // Get the user's selected choice
  const selectedChoice = event.target.textContent;
  // Get the correct answer for the current question
  const correctAnswer = questions[currentQuestionIndex].answer;

  // Check if the selected choice is correct or wrong
  if (selectedChoice === correctAnswer) {
    resultElement.textContent = "Correct!";
  } else {
    resultElement.textContent = "Wrong!";
    // If the answer is wrong, subtract 10 seconds from the timer
    timeLeft -= 10;
  }

  // Display the result for a short time and move to the next question
  showResult();
}

// Function to show the result and move to the next question
function showResult() {
  resultElement.style.display = "block";

  setTimeout(() => {
    resultElement.style.display = "none";
    currentQuestionIndex++;

    // Check if there are more questions to display
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      // If all questions are answered, end the quiz
      endQuiz();
    }
  }, 1000);
}

// Function to start the timer
function startTimer() {
  timer = setInterval(() => {
    // Decrement the time left every second
    timeLeft--;
    // Update the timer display
    updateTimerDisplay();
  }, 1000);
}

// Function to update the timer display
function updateTimerDisplay() {
  // Show the remaining time on the page
  timeLeftElement.textContent = timeLeft;

  // Check if the time has run out, then end the quiz
  if (timeLeft <= 0) {
    endQuiz();
  }
}

// Function to end the quiz and display the final score
function endQuiz() {
  // Stop the timer
  clearInterval(timer);
  // Hide the quiz container
  quizContainer.style.display = "none";
  // Display the user's score
  resultElement.textContent = `Your score: ${timeLeft}`;
  resultElement.style.display = "block";
}
