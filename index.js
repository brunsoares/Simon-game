var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animateButton(userChosenColor, true);
    soundButton(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
});

$(document).keypress(function(event){
    if(event.key == 'a' && started == false){  
        started = true;
        nextSequence();
    }
});

function nextSequence(){
    $("#level-title").text("Level: "+level);
    level++;
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animateButton(randomChosenColor, false);
    soundButton(randomChosenColor);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(nextSequence, 1000);
        }
    } else {
        soundButton("wrong")
        $("#level-title").text("Game Over, Press 'A' key to Restart!");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function animateButton(color, pressed){
    if(pressed){
        $("#"+color).addClass("pressed");
        setTimeout(function(){
            $("#"+color).removeClass("pressed");
        }, 100);
    } else {
        $("#"+color).fadeOut(100).fadeIn(100);
    }
}

function soundButton(color){
    var audio = new Audio("/sounds/"+color+".mp3");
    audio.play();       
}

