let questions = [];
let currentQuestion = null;

fetch("data/questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    loadTopics();
  });

function loadTopics() {
  const topics = [...new Set(questions.map(q => q.topic))];
  const select = document.getElementById("topicSelect");

  topics.forEach(topic => {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    const topicQuestions = questions.filter(q => q.topic === select.value);
    currentQuestion = topicQuestions[0];
    showQuestion();
  });
}

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

function checkAnswer(index) {
  const quiz = document.getElementById("quiz");
  const correct = index === currentQuestion.answerIndex;
  quiz.innerHTML += `<p>${correct ? "Correct!" : "Incorrect."}</p>`;
  quiz.innerHTML += `<p>${currentQuestion.explanation}</p>`;
}
