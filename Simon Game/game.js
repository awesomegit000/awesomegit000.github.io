var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red","green","yellow","blue"];
var started = false;
// button styles
function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}
// sound
function sound(color) {
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}
var level = 1;
function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
     $("h1").text("Level "+level);
     level++;
    started=true;
    return randomNumber;   
}
function userPress() {
    var randomChosenColour = buttonColours[nextSequence()];
        $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
        sound(randomChosenColour);
        gamePattern.push(randomChosenColour);
} 
$("button").click(function (e) { 
    if (started==false) {
        level=1;
        var randomChosenColour = buttonColours[nextSequence()];
        $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
        sound(randomChosenColour);
        gamePattern.push(randomChosenColour);
        started=true;
    }
 });

// game logic
var press = -1;
function checkSequence(userChosenColour) {
        press++;
        if (userChosenColour == gamePattern[press]) {
            if (gamePattern.length == userClickedPattern.length) {
                press=-1;
                userClickedPattern = [];
                setTimeout(function(){
                    userPress();
                }, 500);
            }
        } else {
            press=-1;
            gamePattern=[];
            userClickedPattern=[];   
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 100);
            sound("wrong");
            started=false;
            level= 0;
            $("h1").text("Game Over, Press the button to Restart");
        }   
}

$("div[type|='button']").click(function (e) {     
    var userChosenColour = this.getAttribute("id");
    userClickedPattern.push(userChosenColour);
            animatePress(userChosenColour);
            sound(userChosenColour); 
            checkSequence(userChosenColour);
    }
);



