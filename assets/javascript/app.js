$(document).ready(function () {

// There will need to be a variable for correct answers, incorrect answers, 
//unanswered questions, time remaining, a boolean answered, interval, 
//index to load new question and answers with reloading the page, and object variable for the actual game

var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredQuestions = 0;
var timeRemaining = 16;
var intervalID;
var indexQandA = 0; 
var answered = false; 
var correct;
var triviaGame = [{
        question: " In the episode 'The Death of Eric Cartman', why do the boys ignore Cartman?",
        answer: ["He called Kyle a Jew", "He ate the skins off their KFC Chicken", "He calls Wendy a skinny bitch", "Cartman bets the guys he can sell more records with a Christian Rock Band"],
        correct: "1", 
        image: ("assets/images/kfc.gif")

    }, {
        question: "What is the name of the school counselor for South Park Elementary?",
        answer: ["Mr. Mackey", "Mr. Garrison", "Mrs. Garrison", "PC Principle"],
        correct: "0",
        image: ("assets/images/mackey.gif")

    }, {
        question: "What does Towelie like to do?",
        answer: ["Play video games", "No idea", "Get High", "Help out the boys"],
        correct: "2",
        image: ("assets/images/towlie.gif")

    }, {
        question: "What's the name of Cartman's Boy Band",
        answer: ["Moop", "Faith+1", "Red Hot Catholic Love", "Fingerbang"],
        correct: "3",
        image: ("assets/images/fingerbang.gif")

    }, {
        question: "What is the term that Cartman uses for ginger people that don't have pale skin or freckles?",
        answer: ["Daywalkers", "Gingers", "Half Ginger", "Gingervitis"],
        correct: "0",
        image: ("assets/images/daywalker.gif")

    }, {
        question: "What does Kyle pledge to break after Cartman gives Kyle AIDs?",
        answer: ["Okama GameSphere", "Chinpokomon", "PSP", "Xbox 360"],
        correct: "3",
        image: ("assets/images/aids.gif")

    }, {
        question: "What religion is Stan drawn to when is said to be the reincarnation of the religion's founder?",
        answer: ["Judaism", "Scientology", "Catholicism", "Mormon"],
        correct: "1",
        image: ("assets/images/stan.gif")

    }, {
        question: "What is the name of the club Chef joins in the episode 'The Return of Chef?'",
        answer: ["Unified Atheist League", "Allied Atheist Alliance", "Super Adventure Club", "Hare Club for Men"],
        correct: "2",
        image: ("assets/images/adventure.gif")

    }]; 


// Functions for the game ---------------------------------------------------------------------
// This function starts the game
function startGame() {
        $(".start-button").remove();
        $("h1").remove();   
        $(".jumbotron").css("background-image", "none");
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
    timeRemaining = 16;
    intervalID = setInterval (timer, 1000); 

    // we create an if/else statement 
    // If answered is false, then we wiull run function timer()
    if (answered === false) { 
        timer();    
    } 
    // We create a correct variable to store the correct answer to the triviaGame object variables above. 
    // We also place the triviaGame Object variable into the indexQandA variable so we can cycle through the various items in the object variable.
    correct = triviaGame[indexQandA].correct; 
    // We create a question variable to load the triviaGame Questions from the variable object. 
    var question = triviaGame[indexQandA].question; 
    // We load the question variable into the question class 
    $(".question").html(question);  
    // We need to loop through the answer options in each question so we create a for loop 
    for (var i = 0; i < 4; i++) {
        // we create an answer variable that will populate the answer options available.  
        var answer = triviaGame[indexQandA].answer[i];
        // We then append these answer options to the answers class.  We create a class and a unique ID for each answer. 
        $('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
    }

    // This click function is where we call out the right or wrong answers in the game. 
    $("h4").click(function () {
        //We are stating when the h4 tag is click, we look up the unique ID placed on the h4 tag.
        var id = $(this).attr('id');
        // alert(id);
        // If else statement is describing if the id above matches the correct variable in the triviaGameObject,
        //then state the answer and run either the correctAnswer or incorrectAnswer functions.  
        if (id === correct) {
            answered = true; // stops the timer
            // alert("correct answer");
            $('.question').text(triviaGame[indexQandA].answer[correct] + ". You member!");
            correctAnswer();
        } else {
            answered = true; //stops the timer
            // alert("incorrect answer");
            $('.question').text(triviaGame[indexQandA].answer[id] + "?.....guess you didn't member. The correct answer is: " + triviaGame[indexQandA].answer[correct] + ".");
            incorrectAnswer();
        }
    });
}
//This function controls the timer in the rounds 
function timer() {
    // This if else statement is creating the conditions necessary to clear out the intervals for each question. 
    if (timeRemaining === 0) {
        answered = true;
        clearInterval(intervalID);
        $('.question').text("Member: " + triviaGame[indexQandA].answer[correct] + "!");
        unAnswered();
    } else if (answered === true) {
        clearInterval(intervalID);
    } else {
        timeRemaining--;
        $('.timeRemaining').text('You have ' + timeRemaining + ' seconds to member.');
    }
}

// This function creates the conditions to increment the correct answers varaible while also reseting the round. 
function correctAnswer() {
    correctAnswers++;
    $('.timeRemaining').text("Oh, you member!")
    resetRound();
}

// This function creates the conditions to increment the incorrect answers varaible while also reseting the round.
function incorrectAnswer() {
    incorrectAnswers++;
    $('.timeRemaining').text("Oh no, you don't member!")
    resetRound();

}

// This function creates the conditions to increment the unanswered varaible while also reseting the round.
function unAnswered() {
    unansweredQuestions++;
    $('.timeRemaining').text("Oh no! You didn't member fast enough!")
    resetRound();
}

// This function creates the conditions to reset the rounds in between each question asked. 
function resetRound() {
    // This allowsus to remove the previous answers 
    $('.answersAll').remove();
    //This gives us an image associated with the previous question 
    $('.answers').append('<img class=answerImage img-responsive src="' + triviaGame[indexQandA].image + ' ">'); 
    // increments index which will load next question when loadQandA() is called again
    indexQandA++; 
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
            $('.answers').append('<h4 class= answersAll end>CORRECT MEMBERS: ' + correctAnswers + '</h4>');
            $('.answers').append('<h4 class= answersAll end>INCORRECT MEMBERS: ' + incorrectAnswers + '</h4>');
            $('.answers').append('<h4 class= answersAll end>UNANSWERED QUESTIONS: ' + unansweredQuestions + '</h4>');
             $('.answers').append('<img class=answerImage img-responsive width="400" height="300" src="assets/images/member.jpg">');
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