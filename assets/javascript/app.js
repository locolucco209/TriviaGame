//Page loading expection
window.onload = function() {
    $(".answerResults").hide();
    $(".replay").hide();
    $(".question_box").hide();
    $(".answer").hide();

//Variables set
    let intervalId;
    let timeLeft;
    let clockRunning = false;
    let userChoice;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let randomNumber;
    let questionIndex = 0;
    let questionShowing = false;
    let answerShowing = false;
    let gotRightAnswer;
    let questions = [{
            question: "On 22 May 2010,Laszlo Hanyecz made the first real-world transaction by buying two pizzas in Jacksonville, Florida. How many BTC did Laszlo spend for the two pizza's?.",
            options: ["10BTC", "10,000 BTC", "100BTC", "1,000BTC"],
            correctAnswer: "10,000 BTC",
        },
        {
            question: "Who inve Bitcoin?",
            options: ["Charles Wieber", "Xie Xhu", "Satoshi Nakamoto", "Mircosoft Corp"],
            correctAnswer: "Satoshi Nakamoto",
        },
    ];
    //resets all the variables and UI for start of A new game
    function reset() {
        $(".answerResults").hide();
        $(".replay").hide();
        questionIndex = 0;
        correctAnswers = 0;
        wrongAnswers = 0;
        showQuestion();
    }

    $("button", "#startButton").on("click", function() {
            reset();
        })
        //show the question and all the answers. Display decrementing time left to answer question
    function showQuestion() {
        timeLeft = 10;
        questionShowing = true;
        answerShowing = false;
        // console.log(questions.length);
        $(".preTimerStart").hide();
        $(".answer").hide();
        $(".question_box").show();
        $("#showQuestion1").text(questions[questionIndex].question);
        $("#answer0").html(questions[questionIndex].options[0]);
        $("#answer1").html(questions[questionIndex].options[1]);
        $("#answer2").html(questions[questionIndex].options[2]);
        $("#answer3").html(questions[questionIndex].options[3]);
        if (!clockRunning) {
            intervalId = setInterval(countdown, 1000);
            clockRunning = true;
            $("#countdown").text(timeLeft);
        }
    }
    //function to decrement the time left. Different if statements to determine what to do next when time expires, depending on where we are in the game
    function countdown() {
        timeLeft--;
        $("#countdown").text(timeLeft);
        if (((correctAnswers + wrongAnswers) === questions.length) && (timeLeft < 1)) {
            clockRunning = false;
            showResults();
        } else if (questionShowing) {
            if (timeLeft === 0) {
                showAnswer();
            }
        } else if (answerShowing) {
            if (timeLeft === 0) {
                showQuestion();
            }
        }
    }
    //assign the text in the options div selected to the variable userChoice
    $(".options").on("click", function() {
        userChoice = $(this).text();
        showAnswer();
    });
    //show answer with corresponding picture. Displays different text depending if answer was right or wrong. Shows for 5 seconds
    function showAnswer() {
        questionShowing = false;
        answerShowing = true;
        timeLeft = 1;
        $(".answer").show();
        $(".question_box").hide();
        //if correct answer chosen, add one to let correctAnswers, display correct answer
        if (userChoice === questions[questionIndex].correctAnswer) {
            correctAnswers++;
            $("#correctAnswer").text("Correct! The answer is " + questions[questionIndex].correctAnswer + "!");
            $("#image").html("<img src=assets/images/" + questions[questionIndex].image + " height=400px width=400px>");
            //if wrong answer chosen (or time runs out), add one to let wrongAnswers, display correct answer
        } else {
            wrongAnswers++;
            $("#correctAnswer").text("Incorrect! The answer is " + questions[questionIndex].correctAnswer);
            $("#image").html("<img src=assets/images/" + questions[questionIndex].image + " height=400px width=400px>");
        }
        questionIndex++;
    }

    }
    //click replay button to reset/play again
    $(".replay").on("click", function() {
        reset();
    })
}
