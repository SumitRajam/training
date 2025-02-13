const questionElement = document.getElementById("question") as HTMLHeadingElement;
const choicesElement = document.getElementById("choices") as HTMLDivElement;
const scoreElement = document.getElementById("score") as HTMLDivElement;
const res = document.getElementById("right_wrong") as HTMLSpanElement;

interface Question {
    question: string;
    choices: string[];
    correctAnswer: string;
}

class Quiz {
    private questions: Question[];
    private liveQuestionIndex: number;
    private score: number;

    constructor(questions: Question[]) {
        this.questions = questions;
        this.liveQuestionIndex = 0;
        this.score = 0;
    }

    currentQuestion(): Question {
        return this.questions[this.liveQuestionIndex];
    }

    checkAnswer(answer: string): boolean {
        const currentQuestion: Question = this.currentQuestion();
        const isCorrect: boolean = answer === currentQuestion.correctAnswer;
        if (isCorrect) {
            this.score++;
        }
        this.liveQuestionIndex++;
        return isCorrect;
    }

    getTotalScore(): number { return this.questions.length }

    showAnswerStatus(bool: boolean): void {
        if (bool) {
            res.style.display = "block";
            res.style.color = "green";
            res.innerText = "Correct Answer!"
        } else {
            res.style.display = "block";
            res.style.color = "red";
            res.innerText = "Wrong Answer!"
        }
    }

    isQuizOver(): boolean {
        return this.liveQuestionIndex >= this.questions.length;
    }

    getScore(): number {
        return this.score;
    }

    reset(): void {
        this.liveQuestionIndex = 0;
        this.score = 0;
    }

}

const questions: Question[] = [
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

const quiz = new Quiz(questions);

const nextButtonContainer = document.createElement("div");
nextButtonContainer.classList.add("d-flex", "flex-column", "align-items-center", "mt-3");

const nextButton = document.createElement("button");
nextButton.textContent = "Next";
nextButton.classList.add("btn", "btn-primary", "mt-2", "w-50");
nextButton.style.display = "none";
nextButton.onclick = () => {
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
        scoreElement.textContent = `Your Score: ${quiz.getScore()}/${quiz.getTotalScore()}`;

        const restartButton = document.createElement("button");
        restartButton.textContent = "Restart Quiz";
        restartButton.classList.add("btn", "btn-success", "mt-3", "w-100");
        restartButton.onclick = () => {
            quiz.reset();
            scoreElement.textContent = "";
            displayQuestion();
        };
        choicesElement.appendChild(restartButton);
        return;
    }

    const currentQuestion = quiz.currentQuestion();
    res.style.display = "none";
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";

    currentQuestion.choices.forEach((choice) => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.classList.add("btn", "m-1", "border", "rounded");
        button.onclick = () => {
            const bool = quiz.checkAnswer(choice);
            quiz.showAnswerStatus(bool);
            nextButton.style.display = "block";
        };
        choicesElement.appendChild(button);
    });
}

displayQuestion();
