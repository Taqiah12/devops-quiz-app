let questions = [];
let currentQuestion = null;

// Load questions from JSON
fetch('data/questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    populateTopics();
  })
  .catch(error => console.error("Error loading questions:", error));

// Populate topic dropdown dynamically
function populateTopics() {
  const select = document.getElementById("topicSelect");
  const topics = [...new Set(questions.map(q => q.topic))]; // get unique topics

  topics.forEach(topic => {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    const topicQuestions = questions.filter(q => q.topic === select.value);
    if (topicQuestions.length > 0) {
      currentQuestion = topicQuestions[0];
      showQuestion();
    }
  });
}

// Display question and options
function showQuestion() {
  const quiz = document.getElementById("quiz");
  quiz.innerHTML = `<h3>${currentQuestion.question}</h3>`;

  currentQuestion.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(index);
    quiz.appendChild(btn);
  });
}

// Check answer and show feedback
function checkAnswer(index) {
  const quiz = document.getElementById("quiz");
  const correct = index === currentQuestion.answerIndex;
  const feedback = document.createElement("p");
  feedback.innerHTML = `${correct ? "✅ Correct!" : "❌ Incorrect."} <br> ${currentQuestion.explanation}`;
  quiz.appendChild(feedback);
}
