var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var scoreElement = document.getElementById("score");
var res = document.getElementById("right_wrong");
var Quiz = /** @class */ (function () {
    function Quiz(questions) {
        this.questions = questions;
        this.liveQuestionIndex = 0;
        this.score = 0;
    }
    Quiz.prototype.currentQuestion = function () {
        return this.questions[this.liveQuestionIndex];
    };
    Quiz.prototype.checkAnswer = function (answer) {
        var currentQuestion = this.currentQuestion();
        var isCorrect = answer === currentQuestion.correctAnswer;
        if (isCorrect) {
            this.score++;
        }
        this.liveQuestionIndex++;
        return isCorrect;
    };
    Quiz.prototype.getTotalScore = function () { return this.questions.length; };
    Quiz.prototype.showAnswerStatus = function (bool) {
        if (bool) {
            res.style.display = "block";
            res.style.color = "green";
            res.innerText = "Correct Answer!";
        }
        else {
            res.style.display = "block";
            res.style.color = "red";
            res.innerText = "Wrong Answer!";
        }
    };
    Quiz.prototype.isQuizOver = function () {
        return this.liveQuestionIndex >= this.questions.length;
    };
    Quiz.prototype.getScore = function () {
        return this.score;
    };
    Quiz.prototype.reset = function () {
        this.liveQuestionIndex = 0;
        this.score = 0;
    };
    return Quiz;
}());
var questions = [
    {
        question: "What is TypeScript?",
        choices: [
            "A superset of JavaScript",
            "A new programming language",
            "A database management system",
            "A CSS framework"
        ],
        correctAnswer: "A superset of JavaScript",
    },
    {
        question: "Which file extension is used for TypeScript files?",
        choices: [".js", ".java", ".ts", ".tsx"],
        correctAnswer: ".ts",
    },
    {
        question: "What does TypeScript add to JavaScript?",
        choices: ["More animations", "Static typing", "Better CSS support", "No new features"],
        correctAnswer: "Static typing",
    },
    {
        question: "How do you specify the type of a variable in TypeScript?",
        choices: [
            "let num: number = 10;",
            "var num = 10;",
            "const num = '10';",
            "function num() { return 10; }"
        ],
        correctAnswer: "let num: number = 10;",
    },
    {
        question: "How do you compile a TypeScript file?",
        choices: ["tsc filename.ts", "node filename.ts", "typescript filename.ts", "compile filename.ts"],
        correctAnswer: "tsc filename.ts",
    },
    {
        question: "Which of the following is a valid TypeScript type?",
        choices: ["string", "boolean", "number", "All of the above"],
        correctAnswer: "All of the above",
    },
];
var quiz = new Quiz(questions);
var nextButtonContainer = document.createElement("div");
nextButtonContainer.classList.add("d-flex", "flex-column", "align-items-center", "mt-3");
var nextButton = document.createElement("button");
nextButton.textContent = "Next";
nextButton.classList.add("btn", "btn-primary", "mt-2", "w-50");
nextButton.style.display = "none";
nextButton.onclick = function () {
    nextButton.style.display = "none";
    displayQuestion();
};
res.after(nextButtonContainer);
nextButtonContainer.appendChild(res);
nextButtonContainer.appendChild(nextButton);
function displayQuestion() {
    if (quiz.isQuizOver()) {
        questionElement.textContent = "Quiz Over!";
        choicesElement.innerHTML = "";
        res.style.display = "none";
        scoreElement.textContent = "Your Score: ".concat(quiz.getScore(), "/").concat(quiz.getTotalScore());
        var restartButton = document.createElement("button");
        restartButton.textContent = "Restart Quiz";
        restartButton.classList.add("btn", "btn-success", "mt-3", "w-100");
        restartButton.onclick = function () {
            quiz.reset();
            scoreElement.textContent = "";
            displayQuestion();
        };
        choicesElement.appendChild(restartButton);
        return;
    }
    var currentQuestion = quiz.currentQuestion();
    res.style.display = "none";
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";
    currentQuestion.choices.forEach(function (choice) {
        var button = document.createElement("button");
        button.textContent = choice;
        button.classList.add("btn", "m-1", "border", "rounded");
        button.onclick = function () {
            var bool = quiz.checkAnswer(choice);
            quiz.showAnswerStatus(bool);
            nextButton.style.display = "block";
        };
        choicesElement.appendChild(button);
    });
}
displayQuestion();
