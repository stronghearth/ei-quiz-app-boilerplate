
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
  score: 0
};

/**
 *
 * Your app should include a render() function, that regenerates
 * the view each time the store is updated. See your course
 * material, consult your instructor, and reference the slides
 * for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 */

function handleStartButton () {
  //listens for when start button is clicked, looks for first question and runs generateAnswerChoices to show first Q
  $('main').on('click', '.js-start-quiz', event => {
      event.preventDefault();
      let htmlString = generateAnswerChoices();
      $('main').html(htmlString);
  });
  console.log ('yay your handlestartfunction function is a function!');
 }

function handleChoiceSumbit () {
  //listens for when option is selected and submit button is clicked, loads appropriate correct/incorrect content, tallies up score, tallies up question

  $('form').on('submit', '.js-question-set', event => {
    event.preventDefault();
    if ($('input:selected').val() === STORE.questions[STORE.questionNumber].correctAnswer) {
        let htmlCorrect = generatePositiveFeedback();
        $('main').html(htmlCorrect);
        STORE.score++;
    }
    else {
       let htmlIncorrect = generateNegativeFeedback();
       $('main').html(htmlIncorrect);
    }

    
    //STORE.questionNumber++;

    //generateAnswerChoices();
  });
  console.log('handleChoiceSubmit run');
 }

function generateAnswerChoices (answers) {
  //generates appropriate html and incorporates styles, called by other functions when STORE updates
  console.log ('yay your generateanswerchoices function is a function!');
  return `<p class="currentScore">Current Score: ${STORE.score} out of 5 Correct</p>
      <section class= "albumArt">
          ${STORE.questions[STORE.questionNumber].album}
      </section>
      <section>
          <form id="question-set js-question-set" action="/endpoint" method="GET">
          <fieldset class="questionbox">
              <legend>${STORE.questions[STORE.questionNumber].question}</legend>
              <input type="radio" name="option" id="option1" value="${STORE.questions[STORE.questionNumber].answers[0]}" required>${STORE.questions[STORE.questionNumber].answers[0]}<br>
              <input type="radio" name="option" id="option2" value="${STORE.questions[STORE.questionNumber].answers[1]}" required>${STORE.questions[STORE.questionNumber].answers[1]}<br>
              <input type="radio" name="option" id="option3" value="${STORE.questions[STORE.questionNumber].answers[2]}" required>${STORE.questions[STORE.questionNumber].answers[2]}<br>
          </fieldset>
          <button type="submit" class="js-answer-submit">Submit</button>
          </form>
      </section>
      <section class="questionCount">
          <p>Question ${STORE.questionNumber+1} out of 5</p>
      </section>`;
  
  
}

function generatePositiveFeedback () {
  console.log('hey you got it right!');
  return   `<section class="correctResult">
      <h2>Correct!</h2>
  </section>
  <section class="answerReult">
    <p class="currentScore">Current Score: ${STORE.score} out of 5 Correct</p>
  </section>
  <section class="submitbutton">
      <button type="submit">Next Question</button>
  </section>`;
}

function generateNegativeFeedback () {
  console.log('whoops the answer was wrong')
  return `<section class="wrongResult">
            <h2>Sorry, that was incorrect.</h2>
          </section>
          <section class="correctResult">
            <p>The correct answer was ${STORE.questions[STORE.questionNumber].correctAnswer}.</p>
          </section>
          <section class="answerResult">
              <p class="currentScore">Current Score: ${STORE.score} out of 5 Correct</p>
          </section>
          <section class="submitbutton">
            <button type="submit">Next Question</button>
          </section>`;
}

function handleRestart () {
  //listens for when last page is loaded and the restart button is selected, loads landing pg
  console.log ('yay your handlerestart function is a function!');
}

function runTheQuiz () {
  handleStartButton();
  handleChoiceSumbit();
  handleRestart();
}

$(runTheQuiz);