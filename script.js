// Load quiz questions from a JSON file
const loadQuestions = async () => {
    try {
      const response = await fetch('quiz-data.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error loading questions:', error);
      return [];
    }
  };
  
  const quizContainer = document.querySelector('.quiz-container');
  const questionText = document.querySelector('.question-text');
  const optionsContainer = document.querySelector('.options-container');
  const nextButton = document.querySelector('.next-button');
  const progressContainer = document.querySelector('.progress-container');
  const scoreElement = document.querySelector('.score');
  const resultContainer = document.querySelector('.result-container');
  const resultMessage = document.querySelector('.result-message');
  const currentQuestionElement = document.querySelector('.current-question');
  const totalQuestionsElement = document.querySelector('.total-questions');
  
  let currentQuestionIndex = 0;
  let score = 0;
  let questions = [];
  
  const startQuiz = async () => {
    questions = await loadQuestions();
  
    if (questions.length > 0) {
      // Shuffle the questions (Bonus Challenge)
      questions = shuffleArray(questions);
      totalQuestionsElement.textContent = questions.length; // Set total questions
      displayNextQuestion();
      progressContainer.style.display = 'block';
    } else {
      alert('No questions available.');
    }
  };
  
  const displayNextQuestion = () => {
    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      questionText.textContent = currentQuestion.question;
      optionsContainer.innerHTML = '';
  
      currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(button);
      });
  
      currentQuestionIndex++;
      currentQuestionElement.textContent = currentQuestionIndex;
    } else {
      showResults();
    }
  };
  
  const checkAnswer = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex - 1];
    if (selectedOption === currentQuestion.answer) {
      score++;
    }
    displayNextQuestion();
  };
  
  const showResults = () => {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    totalQuestionsElement.textContent = questions.length; // Set total questions
    scoreElement.textContent = score;
    resultMessage.textContent = `You scored ${score} out of ${questions.length}!`;
  };
  
  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };
  
  nextButton.addEventListener('click', displayNextQuestion);
  window.addEventListener('beforeunload', function (e) {
    if (currentQuestionIndex < questions.length) {
      e.returnValue = 'Are you sure you want to leave the quiz? Your progress will be lost.';
    }
  });


document.addEventListener("visibilitychange", function () {
    if (document.hidden && currentQuestionIndex < questions.length) {
      alert('you are switching the tab during the quiz ');
    }
  });
    
  
  startQuiz();
  