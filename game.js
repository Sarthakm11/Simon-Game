var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

//7 to start game add keypress to doc n on keypress call newSequence(), create new var level=0, change level=0after game start and in newSequence() inc level by 1 everytime its called and also change h1 acc. to levels in newSequence();

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
  var userChosenColor = $(this).attr("class"); //event reqd to pass
  // or               = this.className;  //event not reqd to pass
  // or               = event.target.className;  //event reqd to pass
  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  // console.log(gamePattern);
  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);

});
//1 and 2 and 3
function newSequence() {
  //8.6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;
  // Inside nextSequence(), update the h1 with this change in the value of level
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("." + randomChosenColor).delay(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

}

//8
function checkAnswer(currentLevel) {
  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // console.log("success");
    //8.4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      //8.5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        newSequence();
      }, 1000);

    }
  } else {
    //if wrong,then play wrong sound,add class game-over to body and remove it after 200ms,also change text of h1 to written below one.
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press any key to Restart !");

    startOver();
  }
}

//5 create func playSound(name) and add upper code to play sound from newSequence() and refactor code to platSound(name) on both click and newSequence()..
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3")
  sound.play();

}
//6
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
