 'use strict'

var questions = [{
    question: "A great past time for you consists of:",
    choices: ["Drinking alcholic beverages.", "Smoking.", "Shooting a gun.", "Eating."],
    correctAnswer: 1
}, {
    question: "What's most important thing in society'?",
    choices: ["Sport", "Money", "Religion", "Power"],
    correctAnswer: 2
}, {
    question: "Pick a morning dring to start your day?",
    choices: ["Vodka", "Beer", "Сofee/tea", "champagne"],
    correctAnswer: 1
}, {
    question: "Given the choices, you`d prefer to eat?",
    choices: ["Taco's", "Steak", "Hamburger", "Pizza"],
    correctAnswer: 0
}, {
    question: "You would prefer to live?",
    choices: ["In a forest.", "I don`t really care.", "By the beach.", "In Siberia"],
    correctAnswer: 0
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;


$(document).ready(function(){

    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            let value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });



// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("question is displayd");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for ( let i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}

const $body   = $('body');

const $button = $('.btn')
$button.click(function(){

let $input = $('#search').val();
console.log('clicked')
console.log($input)
 $.ajax({
  url:'https://restcountries.eu/rest/v1/capital/' + $input,
  method: 'GET',
  dataType: 'json',
  data: {

        },
  success: function(data) {
  console.log(data)
      data.forEach(function(cap) {
        console.log(cap.area)
        // console.log(cap.region)

        })

        }

 })
 })
});
