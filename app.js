
const STORE = {
  questions: [
    {
      question: 'Which of these is the correct lyric from Africa by Toto?',
      answers: [
        'I left my brains down in Africa',
        'I miss the rains down in Africa',
        'I bless the rains down in Africa',
      ],
      album: '<img src="albumart/toto.jpg" alt="Toto IV Album Art" class="albumArt">',
      correctAnswer: 'I bless the rains down in Africa',
    },
    {
      question: 'Which of these is the correct lyric from Dancing Queen by ABBA?',
      answers: [
        'See that girl, watch that scene, digging the dancing queen',
        'See that girl, watch her scream, kicking the dancing queen',
        'See that girl, watch that tween, digging the dancing queen',
      ],
      album: '<img src="albumart/abba.jpg" alt="Abba Live Album Art" class="albumArt">',
      correctAnswer: 'See that girl, watch that scene, digging the dancing queen',
    },
    {
      question: 'Which of these is the correct lyric from Bad Moon Rising by Creedence Clearwater Revival?',
      answers: [
        'There\'s a bathroom on the right',
        'There\'s a bad moon on the rise',
        'There\'s a trap room, turn on the light'
      ],
      album: '<img src="albumart/creedance.jpg" alt="Green River Album Art" class="albumArt">',
      correctAnswer: 'There\'s a bad moon on the rise',
    },
    {
      question: 'Which of these is the correct lyric from Blinded by the Light by Munford Man\'s Earth Band?',
      answers: [
        'Held up like a loofah, another farmer of the night',
        'Wrapped up like a truce, another roller in the night',
        'Revved up like a deuce, another runner in the night',
      ],
      album: '<img src="albumart/blinded.jpg" alt="The Roaring Silence Album Art" class="albumArt">',
      correctAnswer: 'Revved up like a deuce, another runner in the night',
    },
    {
      question: 'Which of these is the correct lyric from Beast of Burden by The Rolling Stones?',
      answers: [
        'I\'ll never leave your pizza burning',
        'I\'ll never be your beast of burden',
        'I\'ll hate to leave without returning',
      ],
      album: '<img src="albumart/rollingstones.jpg" alt="Some Girls Album Art" class="albumArt">',
      correctAnswer: 'I\'ll never be your beast of burden',
    }
  ],
  questionNumber: 0,
  score: 0,
  quizState: 'start',
  /* quiz state will be set by event listeners and render will check this variable to see which set of html to load onto the DOM*/
};

const welcomeScreen = function () {
  return `<section class="startMenu">
  <p>A lot of songs are made infamous by a misheard lyric. Take this quiz to see if you can tell the real lyrics from the misheard ones!</p>
  <section class="submitbutton">
  <button type="submit" class="js-start-quiz">Start</button>
  </section>
  </section>`
};

const generateQuestion = function (num) {
  return `<section class="adjustScoreAlbum">
  <p class="currentScore adjustText">Current Score: ${STORE.score} out of 5 Correct</p>
      <section class= "albumArt">
          ${STORE.questions[STORE.questionNumber].album}
      </section>
      </section>
      <section class="adjustText">
          <form id="question-set" class="adjustText js-question-set" action="/endpoint" method="GET">
          <fieldset class="questionbox">
              <legend>${STORE.questions[STORE.questionNumber].question}</legend>
              <input type="radio" name="option" id="option1" value="${STORE.questions[STORE.questionNumber].answers[0]}" required>${STORE.questions[STORE.questionNumber].answers[0]}<br>
              <input type="radio" name="option" id="option2" value="${STORE.questions[STORE.questionNumber].answers[1]}" required>${STORE.questions[STORE.questionNumber].answers[1]}<br>
              <input type="radio" name="option" id="option3" value="${STORE.questions[STORE.questionNumber].answers[2]}" required>${STORE.questions[STORE.questionNumber].answers[2]}<br>
          </fieldset>
          <button type="submit" class="js-answer-submit">Submit</button>
          </form>
      <section class="questionCount">
          <p>Question ${STORE.questionNumber+1} out of 5</p>
      </section>
      </section>`;
};

const generatePositiveFeedback = function() {
  return `<section class="positiveFeedback">
          <section class="correctResult">
            <h2>Correct!</h2>
          </section>
          <section class="answerReult">
            <p class="currentScore">Current Score: ${STORE.score} out of 5 Correct</p>
          </section>
          <section class="submitbutton">
              <button type="submit" class="js-next">Next Question</button>
          </section>
          </section>`;
};

const generateNegativeFeedback = function () {
  return `<section class="negativeFeedback">
          <section class="wrongResult">
            <h2 class="myApologies">Sorry, that was incorrect.</h2>
          </section>
          <section class="correctResult">
            <p>The correct answer was:</p>
             <p class="correctAnswer">${STORE.questions[STORE.questionNumber].correctAnswer}.</p>
          </section>
          <section class="answerResult">
              <p class="currentScore alignScore">Current Score: ${STORE.score} out of 5 Correct</p>
          </section>
          <section class="submitbutton">
            <button type="submit" class="js-next">Next Question</button>
          </section>
          </section>`;
};

const endScreen = function () {
  return `<section class="congratsText">
              <h2 class="congrats">Congratulations, you've completed the quiz!</h2>
              <h3>Final Score ${STORE.score} out of 5 correct</h3>
              <p>This quiz was loosely based on Watch Mojo video! Click on the YouTube icon to see their Top Ten Misheard Lyrics video.</p>
           </section>
          <section class="videoembed">
              <button type="submit" class="btn youtubeLink">
              <a href='https://www.youtube.com/watch?v=VZhxLjDLu6Y' target="_blank">
              <i class="fab fa-youtube fa-2x"></i></a>
              </button>
          </section>
          <section class="submitbutton">
              <button type="submit" class="js-restart">Restart Quiz</button>
          </section>`
};

function handleStartButton () {
  //listens for when start button is clicked, looks for first question and runs generateAnswerChoices to show first Q
  $('main').on('click', '.js-start-quiz', event => {
      event.preventDefault();
      STORE.quizState = 'question';
      renderQuiz();
  });
 };

function handleChoiceSumbit () {
  //listens for when option is selected and submit button is clicked, loads appropriate correct/incorrect content, tallies up score
  $('main').on('submit', '.js-question-set', event => {
    event.preventDefault();
    if ($('input[name=option]:checked').val() === STORE.questions[STORE.questionNumber].correctAnswer) {
        STORE.score++;
        STORE.quizState = 'correct';
        console.log(STORE.quizState)
        renderQuiz();
    }
    else {
      STORE.quizState = 'incorrect';
      console.log(STORE.quizState);
      renderQuiz();
    }
    });
 };

function handleNextButton () {
  //listens for when next button is clicked on the correct/incorrect states, changes question number, changes state back to question
  $('main').on('click', '.js-next', event => {
    event.preventDefault();
    STORE.questionNumber++;
    console.log(STORE.questionNumber);
    if (STORE.questionNumber === STORE.questions.length) {
      STORE.quizState = 'end';
      console.log(STORE.quizState);
      renderQuiz();
    }
    else {
      STORE.quizState = 'question';
      console.log(STORE.quizState);
      renderQuiz(); 
    }
  });
};

function handleRestart () {
  //listens for when last page is loaded and the restart button is selected, resets score/quesion num/state
  $('main').on('click', '.js-restart', event => {
    event.preventDefault();
    STORE.questionNumber = 0;
    STORE.score = 0;
    STORE.quizState = 'start';
    renderQuiz();
  });
};

function renderQuiz () {
  if (STORE.quizState === 'end') {
      const quizEnd = endScreen();
      $('main').html(quizEnd);
  } 
  else if (STORE.quizState === 'start') {
      const begin = welcomeScreen();
      $('main').html(begin);
  }
  else if (STORE.quizState === 'question') {
      const currentQuestion = generateQuestion(STORE.questions[STORE.questionNumber]);
      $('main').html(currentQuestion);
  }
  else if (STORE.quizState === 'correct') {
      const correctResult = generatePositiveFeedback();
      $('main').html(correctResult);
  }
  else if (STORE.quizState === 'incorrect') {
      const incorrectResult = generateNegativeFeedback();
      $('main').html(incorrectResult);
  }
};
  

function runTheQuiz () {
  handleStartButton();
  handleChoiceSumbit();
  handleNextButton();
  handleRestart();
  renderQuiz();
}

$(runTheQuiz);