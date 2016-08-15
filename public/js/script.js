 'use strict'

window.fbAsyncInit = function() {
    FB.init({
      appId      : '1676993712624548',
      xfbml      : true,
      version    : 'v2.7'
    });

function hideContainer(){
$(document).find(".quizContainer").hide();

}


function hideFeedb(){

 $(document).find("#feedback").hide();
 $(document).find("#feedBackSearch").hide();
 $(document).find("#submitFeedback").hide();
}




FB.getLoginStatus(function(response){
if (response.status === 'connected') {
document.getElementById('status').innerHTML = "You are connected to Facebook!";
hideFeedb()
}

else if (response.status === 'not_authorized') {
  document.getElementById('status').innerHTML = "Not connected"
 hideContainer();
 hideFeedb()
}
else {
  document.getElementById('status').innerHTML = "You are not logged in to facebook, please log in to take a quiz"
 hideContainer();
 hideFeedb()
}

});
};

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7&appId=1676993712624548";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

  function post() {
FB.api("/me/feed", "post", {message: "my first status...app.js"}, function(response){
  document.getElementById('status').innerHTML = response.id
})

}

function post() {
FB.api("/me/feed", "post", {link: 'https://scotch.io/tutorials/easy-node-authentication-facebook'}, function(response){
  document.getElementById('status').innerHTML = response.id
})
}
function logout(){
FB.logout(function(response) {
 document.getElementById('status').innerHTML = "You are logged out"

})
};

  function login() {
FB.login(function(response){
if (response.status === 'connected') {
document.getElementById('status').innerHTML = "we are con"

}

else if (response.status === 'not_authorized') {
  document.getElementById('status').innerHTML = "Not connected";
   hideContainer();

}
else {
  document.getElementById('status').innerHTML = "You are not logged in into facebook, please log in to take a quiz";
}} ,{scope:'public_actions'});
}

var questions = [{
    question: "A great past time for you consists of:",
    choices: ["Drinking alcholic beverages.", "Smoking.", "Shooting a gun.", "Eating."],
    correctAnswer: 1,


}, {
    question: "What's most important thing in society'?",
    choices: ["Sport", "Money", "Religion", "Power"],
    correctAnswer: 2,

}, {
    question: "Pick a morning dring to start your day?",
    choices: ["Vodka", "Beer", "Сofee/tea", "champagne"],
    correctAnswer: 1,

}, {
    question: "Given the choices, you`d prefer to eat?",
    choices: ["Taco's", "Steak", "Hamburger", "Sausages"],
    correctAnswer: 0,

}, {
    question: "You would prefer to live?",
    choices: ["In a forest.", "I don`t really care.", "By the beach.", "In Siberia"],
    correctAnswer: 0,

}];

var images =["ger.jpg"]
var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;
var Germany = 0;
var France = 0;
var Italian =0;

$(document).ready(function(){
  const currentBeer = null;
   const $ul = $('<ul>')
  const $div = $('#brApend');
 const $feedbackbtn = $('#submitFeedback');
 const $feedbackDisplayBtn = $('#feedBackSearch');
 const $divFeedBack = $('#brApendFeedBack');

$feedbackDisplayBtn.on('click', function() {
$ul.empty();
$div.empty();

   $.ajax({
      url:'./feedback/get',
      method: 'GET',
      dataType: 'json',

      success: function(data) {
        console.log('To display :',data);


        data.forEach(function(beer) {
        let $p = $('<p>').addClass('fed').text('Feedback :' + beer.FeedBack).after("<br />")
        $divFeedBack.append($p).append($('<hr>'))

    });
    }
    });
    });

$feedbackbtn.on('click', function() {
   const $feedbackValue = $('#feedback').val();
   console.log('YES is coming :' );

$.ajax({
      url:'./feedback/save',
      method: 'POST',
      dataType: 'json',
      data: currentBeer,
      success: function(data) {
        $('#feedback').hide();
        $('#submitFeedback').hide();
        $div.empty();

  }
    });
  });

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
                }

                   else {
                    displayScore();
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
                   hideBtn();
        }
    });

 const deImg = $(document).find("#ItemPreview1").attr('src', 'images/ger.jpg').hide();
 const parImg =$(document).find("#ItemPreview2").attr('src','images/fr.gif').hide();
 const mosImg =$(document).find("#ItemPreview3").attr('src','images/ms.png').hide();
 const engIsh =$(document).find("#ItemPreview4").attr('src','images/eng.jpg').hide();
 const  amer = $(document).find("#ItemPreview5").attr('src','images/capamer.png').hide();


 function displayCurrentQuestion() {
     console.log("question is displayd");
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    $(questionClass).text(question);

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
    hideBtn();
}

function displayScore() {
    // $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
     showResult()
}

function hideScore() {
    $(document).find(".result").hide();
}

function showResult() {
    $(document).find(".btn").show();
}
function hideBtn() {
    $(document).find(".btn").hide();
}




function ShowFeedb(){

 $(document).find("#feedback").show();
 $(document).find("#feedBackSearch").show();
 $(document).find("#submitFeedback").show();
}





function hideContainer(){
$(document).find(".quizContainer").hide();

}
hideBtn();

const $body   = $('body');

const $button = $('.btn')
$button.click(function(){

let $input = $('#search').val();

if (correctAnswers == 0) {
  $input = "moscow";
  $(document).find(".btn").show();
    amer.show();
 $(document).find("#feedback").show();
 $(document).find("#feedBackSearch").show();
 $(document).find("#submitFeedback").show();
    hideContainer();
}

else if (correctAnswers == 1) {
  $input = "berlin";
  $(document).find(".btn").show();
  deImg.show();
  ShowFeedb()
  hideContainer();
}

else if (correctAnswers == 2) {
  $input = "washington";
  $(document).find(".btn").show();
  mosImg.show();
  ShowFeedb()
    hideContainer();
}

else if (correctAnswers == 3) {
  $input = "london";
  engIsh.show();
  ShowFeedb()
  $(document).find(".btn").show();
   hideContainer();
}

else if (correctAnswers == 4) {
  $input = "paris";
  $(document).find(".btn").show();
   parImg.show();
   ShowFeedb()
   hideContainer();
}
  $.ajax({
  url:'https://restcountries.eu/rest/v1/capital/' + $input,
  method: 'GET',
  dataType: 'json',
  data: {

        },
  success: function(data) {
  console.log(data)
      data.forEach(function(cap) {
        let $div =$('#all');

        let $p2 = $('<p>').text("Country name: "+cap.name)
        let $p = $('<p>').text("Area is:  " + cap.area)
        let $p3 = $('<p>').text("Population:  " + cap.population)
        let $p4 = $('<p>').text("Region:  " + cap.subregion)
        console.log(cap.area)
        console.log(cap.name)

        $div.append($p);
        $div.append($p2);
        $div.append($p3);
        $div.append($p4)

        })
        }
 })
 })
});
