var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var gameOn = false;
var level = 0;

function nextSequence() {
    userPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    
    var randNum = Math.floor(Math.random() * 4);
    var randColor = buttonColours[randNum];
    gamePattern.push(randColor);

    
    setTimeout(function() {
        $("#"+randColor).fadeOut(100).fadeIn(100);
        makeSound(randColor);
    }, 250);
}

function makeSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(color) {
    $("#"+color).addClass("pressed");

    setTimeout(function() {
        $("#"+color).removeClass("pressed");
    }, 100);
}

function checkAnswer(currLevel) {
    if (userPattern[currLevel] === gamePattern[currLevel]) {
        if (userPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        $("#level-title").text("Game Over, Press Any Key to Restart");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver() {
    gamePattern = [];
    gameOn = false;
    level = 0;
}

$(".btn").on("click", function() {
    if (level > 0) {
        var userChoose = $(this).attr("id");
        userPattern.push(userChoose);
        makeSound(userChoose);
        animatePress(userChoose);
        checkAnswer(userPattern.length-1);
    }
});

$(this).keypress(function() {
    if (gameOn === false) {
        gameOn = true;
        nextSequence();
    }
});

