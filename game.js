
// SETTING THE NPCS
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var level = 0;
var started = false;

// SETTING WHAT HAPPENS WHEN KEYBOARD IS PRESSED
$(document).keydown(function() {

  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $("h2").text("");
  }

})

// SETTING WHAT HAPPENS WHEN BUTTON IS CLICKED
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


// SETTING IF ANSWER IS RIGHT, THEN CONTINUE, AND IF WRONG, THEN START OVER
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success")
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    playSound("wrong");
    $("h1").text("Game Over! Press any key to restart.");
    $("h2").text("Your highscore was Level " + level + " !");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();

  }

  }



// SETTING THE PATTERN FOR NPC TO ACTIVATE
function nextSequence() {
  userClickedPattern = [];
  level++;
    $("#level-title").text("Level " + level);

  var randomNumber = Math.round(Math.random() * 3);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour)

}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}



function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
