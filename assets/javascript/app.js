//Questions vars
var questions = [{
  question: "What was John Candy's character's name in the 1987 comedy movie, Planes, Trains, and Automobiles?",
  choices: ["Del Griffith", "Don Griffith", "Dil Griffith", "Dom Griffith"],
  answer: "Del Griffith",
  image:"assets/images/JohnCandy.gif"
}, {
  question: "Bruce Banner turns into what fictional superhero when he becomes angry?",
  choices: ["Spiderman", "Batman", "Hulk", "Wonder Woman"],
  answer: "Hulk",
  image:"assets/images/TheHulk.gif"
}, {
  question: "Which President is on the United States 1,000 dollar bill?",
  choices: ["William McKinley", "Grover Cleveland", "Benjamin Harrison", "Ulysses S. Grant"],
  answer: "Grover Cleveland",
  image:"assets/images/money.gif"
}, {
  question: "What football team had the biggest scoring comeback in the history of the Super Bowl?",
  choices: ["Green Bay", "Vikings", "Cowboys", "Patriots"],
  answer: "Patriots",
  image:"assets/images/patriots.gif"
}, {
  question: "Traditionally, the term 'caviar' refers to the salt-cured roe of which fish?",
  choices: ["Salmon", "Cod", "Albacore", "Sturgeon"],
  answer: "Sturgeon",
  image:"assets/images/sturgeon.gif"
}, {
  question: "What chemical element gives the blood of a lobster a bluish tint?",
  choices: ["Copper", "Zinc", "Gold", "Lead"],
  answer: "Copper",
  image:"assets/images/lobster.gif"
}, {
  question: "In humans, what is the only internal organ capable of regenerating lost tissue?",
  choices: ["Liver", "Kidney", "Spleen", "Pancreas"],
  answer: "Liver",
  image:"assets/images/liver.gif"
}, {
  question: "What is the most popular breed of dog in the United States?",
  choices: ["German Shepherd", "Great Dane", "Labrador Retriever", "Poodle"],
  answer: "Labrador Retriever",
  image:"assets/images/labrador.gif"
},{
  question: "Which is the most abundant metal in the earth's crust?",
  choices: ["Silver", "Aluminum", "Lead", "Iron"],
  answer: "Aluminum",
  image:"assets/images/aluminum.gif"
},{
  question: "How many castaways were there on the American sitcom Gilligan's Island?",
  choices: ["Nine", "Eight", "Seven", "Six"],
  answer: "Seven",
  image:"assets/images/gilligansisland.gif"
}];

//Global vars
var zone = $('#questionzone');
var startCounter = 30;

//Button events, Start the game, picking the answers and restarting the game.
$(document).on('click', '#start', function(event) {
  $('#startarea').prepend('<h2>Time Remaining: <span id="countTimer">30</span> Seconds</h2>');
  game.loadQuestion();
});

$(document).on('click', '.answerButton', function(event) {
  game.clicked(event);
});

$(document).on('click', '#startOver', function(event) {
  game.reset();
});

//Start of game code
var game = {
  questions:questions,
  currentQuestion:0,
  counter:startCounter,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#countTimer').html(game.counter);
    if (game.counter === 0){
      game.timeUp();
    }
  },
  //Start by setting up the first question and then reloading each additonal question.
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    zone.html('<h2>' + questions[game.currentQuestion].question);
    for (var i = 0; i < questions[game.currentQuestion].choices.length; i++){
      zone.append('<button class="answerButton" id="button"' + 'data-name="' + questions[game.currentQuestion].choices[i] + '">' + questions[game.currentQuestion].choices[i]+ '</button>');
    }
  },
  //Cycle throught the questions 
  nextQuestion: function(){
    game.counter = startCounter;
    $('#countTimer').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  //If timer runs out let player know with answer.
  timeUp: function (){
    clearInterval(timer);
    $('#countTimer').html(game.counter);
    zone.html('<h2>Times Up!</h2>');
    zone.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].answer);
    zone.append('<img src="' + questions[game.currentQuestion].image + '" />');
    game.setResults();
  },
  //capture the players choice of answer and determine wrong or right.
  clicked: function(event) {
    clearInterval(timer);
    if ($(event.target).data("name") === questions[game.currentQuestion].answer){
      game.correctAnswer();
    } 
    else {
      game.incorrectAnswer();
    }
  },
  //Output correct selection.
  correctAnswer: function(){    
    game.correct++;
    clearInterval(timer);
    zone.html('<h2>Correct!</h2>');
    zone.append('<img src="' + questions[game.currentQuestion].image + '" />');
    game.setResults();
  },
  //Output wrong selection and give answer to question.
  incorrectAnswer: function() {
    game.incorrect++;
    clearInterval(timer);
    zone.html('<h2>Nope!</h2>');
    zone.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].answer);
    zone.append('<img src="' + questions[game.currentQuestion].image + '" />');
    game.setResults();
  },
  //Continue cycle of question until last question.
  setResults: function(){
      if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 4000);
    } else {
      setTimeout(game.nextQuestion, 4000);
    }
  },
  //After last question post the results and setup a start button to replay.
  results: function() {
    clearInterval(timer);
    zone.html('<h2>All done, here are your results!</h2>');
    $('#countTimer').html(game.counter);
    zone.append('<h3>Correct Answers: ' + game.correct);
    zone.append('<h3>Incorrect Answers: ' + game.incorrect);
    zone.append('<h3>Unanswered: ' + (questions.length - (game.correct + game.incorrect)));
    zone.append('<br><button id="startOver">Start Over?</button>');
  },
  //Clear all counters and start game again (trying 'this')
  reset: function(){
    this.currentQuestion = 0;
    this.counter = startCounter;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

