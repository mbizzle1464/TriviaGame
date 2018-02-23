$(document).ready(function () {

// There will need to be a variable for correct answers, incorrect answers, 
//unanswered questions, time remaining, a boolean answered, interval, 
//index to load new question and answers with reloading the page, and object variable for the actual game

var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredQuestions = 0;
var timeRemaining = 15;
var intervalID;
var indexQandA = 0; 
var answered = false; 
var correct;
var triviaGame = [{
        question: "What is the name for a dog created by crossing a Labrador Retriever and a Poodle?",
        answer: ["labbypoodle", "labradoodle", "poodlelab", "poodledoodle"],
        correct: "1", 

    }, {
        question: "The Chihuahua is a breed of dog believed to originate from what country?",
        answer: ["mexico", "america", "peru", "ecuador"],
        correct: "0",

    }, {
        question: "What is the most popular breed of dog in the United States?",
        answer: ["german sherpard", "pug", "labrador retriever", "irish settler"],
        correct: "2",

    }, {
        question: "The Alaskan Malamute is a type of what?",
        answer: ["moose", "wolf", "cat", "dog"],
        correct: "3",

    }, {
        question: "A puggle is a cross between which two dog breeds?",
        answer: ["pug and beagle", "beagle and poodle", "pug and poodle", "beagle and terrier"],
        correct: "0",

    }, {
        question: "How many chambers are there in a dog's heart?",
        answer: ["1", "3", "6", "4"],
        correct: "3",

    }, {
        question: "In the United States which breed of dog is commonly known as a firehouse dog?",
        answer: ["german sherpard", "dalmatian", "blue heeler", "boxer"],
        correct: "1",

    }, {
        question: "The dingo is a free ranging dog found mainly in which country?",
        answer: ["ireland", "new zealand", "australia", "japan"],
        correct: "2",

    }]; 


// Functions for the game ---------------------------------------------------------------------
// This function starts the game
function startGame() {
        $(".start-button").remove();
        correctAnswers = 0;
        incorrectAnswers = 0;
        unansweredQuestions = 0;
        loadQandA();
    }

// This function loads the Questions and Answers
function loadQandA() {
    // This will set the variable answered to false, timeRemaining to 15
    // and we are setting variable intervalID to setInterval to a timer and to countdown 1000ms 
    answered = false;   
    timeRemaining = 15;
    intervalID = setInterval (timer, 1000); 

    // we create an if/else statement 
    if (answered === false) { 
        timer();    
    } 
    // This line is indicating that if answered is false, then the correct variable will load the 
    //correct variable from the triviaGame object variable into the indexQandA array. 
    // We will then create a question variable to do the same thing for the question. 
    // We will post the variable question 
    correct = triviaGame[indexQandA].correct;   
    var question = triviaGame[indexQandA].question; 
    $(".question").html(question);  
    for (var i = 0; i < 4; i++) {
        var answer = triviaGame[indexQandA].answer[i];
        $('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
    }
    $("h4").click(function () {
        var id = $(this).attr('id');
        // alert(id);
        if (id === correct) {
            answered = true; // stops the timer
            // alert("correct answer");
            $('.question').text("Yo, the answer is fo shizzle: " + triviaGame[indexQandA].answer[correct]);
            correctAnswer();
        } else {
            answered = true; //stops the timer
            // alert("incorrect answer");
            $('.question').text("YOU CHOSE: " + triviaGame[indexQandA].answer[id] + ".....HOWEVER THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
            incorrectAnswer();
        }
    });
}

function timer() {
    if (timeRemaining === 0) {
        answered = true;
        clearInterval(intervalID);
        $('.question').text("THE CORRECT ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
        unAnswered();
    } else if (answered === true) {
        clearInterval(intervalID);
    } else {
        timeRemaining--;
        $('.timeRemaining').text('YOU HAVE ' + timeRemaining + ' SECONDS TO CHOOSE');
    }
}

function correctAnswer() {
    correctAnswers++;
    $('.timeRemaining').text("YOU HAVE ANSWERED CORRECTLY!")
    resetRound();
}

function incorrectAnswer() {
    incorrectAnswers++;
    $('.timeRemaining').text("YOU HAVE ANSWERED INCORRECTLY!")
    resetRound();

}

function unAnswered() {
    unansweredQuestions++;
    $('.timeRemaining').text("YOU FAILED TO CHOOSE AN ANSWER")
    resetRound();
}

function resetRound() {
    $('.answersAll').remove();
    $('.answers').append('<img class=answerImage width="150" height="150" src="' + triviaGame[indexQandA].image + ' ">'); // adds answer image
    indexQandA++; // increments index which will load next question when loadQandA() is called again
    if (indexQandA < triviaGame.length) {
        setTimeout(function () {
            loadQandA();
            $('.answerImage').remove();
        }, 5000); // removes answer image from previous round
    } else {
        setTimeout(function () {
            $('.question').remove();
            $('.timeRemaining').remove();
            $('.answerImage').remove();
            $('.answers').append('<h4 class= answersAll end>CORRECT ANSWERS: ' + correctAnswers + '</h4>');
            $('.answers').append('<h4 class= answersAll end>INCORRECT ANSWERS: ' + incorrectAnswers + '</h4>');
            $('.answers').append('<h4 class= answersAll end>UNANSWERED QUESTIONS: ' + unansweredQuestions + '</h4>');
            setTimeout(function () {
                location.reload();
            }, 7000);
        }, 5000);
    }
};

$('.startButton').on("click", function () {
    $('.startButton');
    startGame();

});
});