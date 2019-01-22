var setTimer = $("#timer");
var question = $("#question");
var results = $("#results");
var rightResult = $("#correct_answer");
var wrongResult = $("#incorrect_answer");
var win = 0;  // correct guess
var loss = 0; // incorrect guess
var tally = 0; // wins + loss
var answer = $("#answer");
var response;
var correctAnswer;
var questionOne;
var gameOver = $("#gameOver");
var isTimer = false;


//  Game Timer function
function timer() {
    var sec = 30;
    interval = setInterval(function () {
        setTimer.text(sec);
        sec--;
        if (sec === -1) {
            clearInterval(interval);
            loss++;
            if (tally != response.results.length) {
                nextQuestion(tally);
                
            }
            else {
                endGame();
            }
        };
    }, 1000);
};


// shuffles the answers
function shuffle(correct, incorrect) {
    // adds incorrect answers to temp array
    var temp = incorrect.slice();

    // Generates random number from the length of incorrect answers
    let randomIndex = Math.floor(Math.random() * incorrect.length);

    // adds correct answer to temp array at the location of random number
    temp.splice(randomIndex, 0, correct);

    return temp;
}

// uses ajax to call opentb's api
function getData() {
    // var movie = $(this).attr("data-name");
    var queryURL = "https://opentdb.com/api.php?amount=10&category=16";

    // Creates AJAX call for random question
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {  
        response = data;
        firstQuestion();
    })
}

function nextQuestion(x) {
    question.empty();
    results.empty();
    timer();
    console.log(x);
    // adds a question to the div id question1
    question.html(response.results[x].question);

    var correctResponse = response.results[x].correct_answer;
    var incorrectResponse = response.results[x].incorrect_answers;
    correctAnswer = response.results[x].correct_answer;

    // combines correct/incorrect answers to a new temp array and shuffles the order
    var answerShuffle = shuffle(correctResponse, incorrectResponse)
    // loops through answers and adds them to the screen
    for (var i = 0; i < answerShuffle.length; i++) {
        // var radioBtn = $("<input type='radio'id='q" + i + "'>");

        var answers = $('<a class="waves-effect waves-light grey btn" id="userClick">');
        answers.html(answerShuffle[i]);
        results.append(answers);
    }
    tally++;

};

function firstQuestion() {

    for (i = 0; i < response.results.length; i++) {
        // adds a question to the div id question1
        questionOne = question.html(response.results[i].question);

        var correctResponse = response.results[i].correct_answer;
        var incorrectResponse = response.results[i].incorrect_answers;
        correctAnswer = response.results[i].correct_answer;

    // combines correct/incorrect answers to a new temp array and shuffles the order
    }
        var answerShuffle = shuffle(correctResponse, incorrectResponse)
        // loops through answers and adds them to the screen
        for (var i = 0; i < answerShuffle.length; i++) {

            var answers = $('<a class="waves-effect waves-light grey btn" id="userClick">');
            answers.html(answerShuffle[i]);
            results.append(answers);
        }
    tally++;
};

function endGame() {
    clearInterval(interval);
    rightResult.html("Number of Correct Answers: " + win).show();
    wrongResult.html("Number of Wrong Answers: " + loss).show();
    gameOver.show("Game Over");
    $("#start").show();
    question.hide();
    results.hide();
    reset();
}

function reset () {
    win = 0;
    loss = 0;
    tally = 0;
    results.empty();
    firstQuestion(tally);
}

// works
getData();
gameOver.hide();
question.hide();
results.hide();


$("#start").on("click", function() {

    $("#start").hide()
    gameOver.hide();
    question.show();
    results.show();
    timer();
    rightResult.hide();
    wrongResult.hide();  

})

console.log(response)
$("body").on('click', "#userClick", function() {

    console.log(response.results.length)

    // users selection
    var userClickedKey = $(this).text();

    // decides if user wins or loses
    if (userClickedKey === correctAnswer) {
        win++
        // tally++
        console.log("winner " + win);
        if (tally != response.results.length) {
            clearInterval(interval);
            nextQuestion(tally);
            // timer();
        }
        else {
            endGame();
        }
    }
    else {
        loss++
        console.log("loser " + loss);
        // answer.html("Correct answer was: " + correctAnswer);

        answer.html("Correct answer was: " + correctAnswer);
        answer.show();
        
        if (tally != response.results.length || sec === -1) {
            clearTimeout(wrongTime);
            var wrongTime = setTimeout(function () {

                answer.hide();
                clearInterval(interval);
                // issue with next question on timer
                nextQuestion(tally);
            },
                3000);
        }
        else {
            endGame();
        }
    }
})

