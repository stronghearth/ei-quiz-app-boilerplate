
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
  $('form').on('submit', '.js-answer-submit', event => {
    event.preventDefault();
    
    generateAnswerChoices();
  })
  console.log ('yay your handlechoicesubmit function is a function!');
 }

function generateAnswerChoices (answers) {
  //generates appropriate html and incorporates styles, called by other functions when STORE updates
  const questionString = 
    `<p class="currentScore">Current Score: ${} out of 5 Correct</p>
      <section class= "albumArt">
          ${}
      </section>
      <section>
          <form action="/some-server-endpoint" method="GET">
          <fieldset class="questionbox">
              <legend>${}</legend>
              <input type="radio" name="option" id="option" required>${}<br>
              <input type="radio" name="option" id="option" required>${}<br>
              <input type="radio" name="option" id="option" required>${}<br>
          </fieldset>
          <button type="submit" class="js-answer-submit">Submit</button>
          </form>
      </section>
      <section class="questionCount">
          <p>Question ${} out of 5</p>
      </section>`;
  
  console.log ('yay your generateanswerchoices function is a function!');
}

function handleRestart () {
  //listens for when last page is loaded and the restart button is selected, loads landing pg
  console.log ('yay your handlerestart function is a function!');
}

function checkAllTheFunctions () {
  handleStartButton();
  handleChoiceSumbit();
  handleRestart();
}

$(checkAllTheFunctions);