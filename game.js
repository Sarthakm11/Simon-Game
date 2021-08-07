var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];


var gameStarted = false; //You'll need a way to keep track of whether if the game has started or not,so only call nextSequence() on first keypress.
var level = 0;

$(document).keypress(function() {
  if (!gameStarted) {
    $("h1").text("Level " + level);
    newSequence();
    gameStarted = true; //since game is now started so changed its state.
  }
});

//4
$("button").on("click", function(event) {
  var userChosenColor = $(this).attr("class"); 
  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);

});

function newSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  $("." + randomChosenColor).delay(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        newSequence();
      }, 1000);

    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press any key to Restart !");

    startOver();
  }
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3")
  sound.play();

}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}


function startOver() {
  gamePattern = [];
  level = 0;
  gameStarted = false;
}
