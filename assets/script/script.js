//questions
function question (text, choices, answer) {
    this.text=text;
    this.choices = choices;
    this.answer = answer;
}

question.prototype.correctAnswer = function(choice) {
    return choice === this.answer;
}

//quiz controller

function quiz (problems) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

quiz.prototype.guess = function(answer) {
    if (this.getQuestionIndex().correctAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}



//application
function populate() {
    if (exam.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = exam.getQuestionIndex().text;

        // show choices
        var choices = exam.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

/*function startQuiz() {
    var startQuizHtml = "<h1>Coding Quiz Challenge!</h1> <div class='startPageContent'><h2>Think you know JavaScript?<br>Try your best to beat the timer!</h2><button id='btnStart'>Start</button></div>";
    var element = document.getElementById('quiz');
    element.innerHTML = startQuizHtml;
    populate(); 
}*/

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        exam.guess(guess);
        populate();
    }
}

function showProgress() {
    var currentQuestionNumber = exam.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + exam.questions.length;
}

function showScores() {
    var gameOverHtml = "<h1 >Result</h1>";
    gameOverHtml += "<div class='result-container'><div><h2 id='score'> Your Score: " + exam.score + "</h2></div> <div> <form> <label for='fname'> <h2>Enter your name!</h2></label> <div><input type='text' id='fname' name='fname'></div><button id='btnSub'>Submit</button></form></div></div>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHtml;
}

var questions = [
    new question ("One Do you think this is a question?", ['Yes', 'No', 'Maybe', "I don't know"], "Yes"),
    new question ("Two Do you think this is a question?", ['Yes', 'No', 'Maybe', "I don't know"], "Yes"),
    new question ("Three Do you think this is a question?", ['Yes', 'No', 'Maybe', "I don't know"], "Yes"),
    new question ("Four Do you think this is a question?", ['Yes', 'No', 'Maybe', "I don't know"], "Yes"),
    new question ("Five Do you think this is a question?", ['Yes', 'No', 'Maybe', "I don't know"], "Yes"),
    new question ("Six Do you think this is a question?", ['Yes', 'No', 'Maybe', "I don't know"], "Yes")
];

var exam = new quiz(questions);

populate();
