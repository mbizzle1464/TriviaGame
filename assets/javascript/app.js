$(document).ready(function () {

// There will need to be a variable for correct answers, incorrect answers, 
//unanswered questions, time remaining, a boolean answered, interval, 
//index to load new question and answers with reloading the page, and object variable for the actual game

var correctAnswers = 0, 
    incorrectAnswers = 0, 
    unansweredQuestions = 0,    
    timeRemaining = 10; 
    intervalID, 
    indexQandA = 0, 
    answered = false, 
    correct, 
    triviaGame = [{ 
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


}); 


function loadQandA() {
    answered = false;   
    timeRemaining = 10;
    intervalID = setInterval (timer, 1000); 
    if (answered === false) { 
        timer();    
    } 
    correct = triviaGame[indexQandA].correct;   
    var question = triviaGame[indexQandA].question; 
    $(".question").html(question);  
    for (var i = 0; i < 4; i++) {
        var answer = triviaGame[indexQandA].answer[i];
        $(".answers").append('<h4 class = answersAll id=' + i '>' + answer + '</h4>'); 
    }
}

function startGame(){
    $(".start-button").remove();    
    correctAnswers = 0; 
    incorrectAnswers = 0;   
    unansweredQuestions = 0;    
    loadQandA();    
}