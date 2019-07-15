$(document).ready(function(){
    // event listeners
    $("#time-remaining").hide();
    $("#start-life-with-derek-trivia").on('click', lwdTrivia.startLWDTriviaGame);
    $(document).on('click', '.option', lwdTrivia.evaluateGuess);
})

var lwdTrivia = {
    // trivia properties
    numCorrect: 0,
    numIncorrect: 0,
    numUnanswered: 0,
    lwdCurrentSet: 0,
    lwdTimer: 60,
    lwdTimerOn: false,
    lwdTimerId: '',
    // questions options and answers data
    lwdQuestions: {
        q1: "Where does the family live on the show?",
        q2: "Where do the Venturi-McDonald live?",
        q3: "How many children are in the combined family?",
        q4: "What is the name of Casey and Derek's high school?",
        q5: "Who had to move to the basement to give Casey a room upstairs?",
        q6: "What is the name of Casey's best friend?",
        q7: "What is the name of Derek's first serious girlfriend?",
        q8: "What name did Derek give Casey, when she tripped at the stairs in school?",
        q9: "Who is the youngest child in the combined family?",
        q10: "What is the name of the boy Casey stars opposite in the school musical, in the episode 'Show-Off Tune'?",
        q11: "'The Fall'- At the end of this episode, everyone finds out Derek, too, had a nickname once! What is it?",
        q12: "Where do Edwin and Lizzie always meet when they want to talk, usually about their oldest siblings?"
    },
    lwdOptions: {
        q1: ["Toronto, Ontario, Canada", "London, Ontario, Canada", "Brampton, Ontario, Canada", "Quebec City, Quebec, Canada"],
        q2: ["Ontario, Canada", "Quebec, Canada", "Alberta, Canada", "British Columbia, Canada"],
        q3: ["2", "3", "4", "5"],
        q4: ["London High", "Toronto High", "Thompson High", "Maple Leaf High"],
        q5: ["Edwin", "Nora and George", "Derek", "Marti and Lizzie"],
        q6: ["Emily", "Sam", "Kendra", "Ralph"],
        q7: ["Emily", "Mary", "Vicki", "Kendra"],
        q8: ["Fallzilla", "Klutzilla", "Tripzilla", "Clumsy Casey"],
        q9: ["Edwin", "Lizzie", "Marti", "Casey"],
        q10: ["Noel", "Joel", "Cole", "Sheldon Schlepper"],
        q11: ["Derekus", "Dereka", "Dereki", "Derrie"],
        q12: ["Casey's room", "basement", "Derek's room", "in the game closet"]
    },
    lwdAnswers: {
        q1: "London, Ontario, Canada",
        q2: "Ontario, Canada",
        q3: "5",
        q4: "Thompson High",
        q5: "Nora and George",
        q6: "Emily",
        q7: "Kendra",
        q8: "Klutzilla",
        q9: "Marti",
        q10: "Noel",
        q11: "Dereka",
        q12: "in the game closet"
    },
    // trivia methods
    //method to initialize game
    startLWDTriviaGame: function(){
        // resetting game results
        lwdTrivia.lwdCurrentSet = 0;
        lwdTrivia.numCorrect = 0;
        lwdTrivia.numIncorrect = 0;
        lwdTrivia.numUnanswered = 0;
        clearInterval(lwdTrivia.lwdTimerId);

        // show game section
        $('#life-with-derek-trivia-game').show();

        // empty last results
        $('#life-with-derek-trivia-game-results').html('');

        // show timer
        $('#timer').text(lwdTrivia.lwdTimer);

        // remove start button
        $('#start-life-with-derek-trivia').hide();

        $('#time-remaining').show();

        // ask first question
        lwdTrivia.nextQuestion();
    },
    // method to loop through and display questions and options
    nextQuestion: function(){
        //set timer to 10 seconds for each question
        lwdTrivia.lwdTimer = 10;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(lwdTrivia.lwdTimer);

        // to prevent timer speed up
        if(!lwdTrivia.lwdTimerOn){
            lwdTrivia.lwdTimerId = setInterval(lwdTrivia.timerRunning, 1000);
        }

        // gets all questions then indexes the current questions
        var questionContent = Object.value(lwdTrivia.lwdQuestions)[lwdTrivia.lwdCurrentSet];
        $('#life-with-derek-trivia-question').text(questionContent);

        // an array of all the user options for the current question
        var questionOptions = Object.values(lwdTrivia.lwdOptions)[lwdTrivia.lwdCurrentSet];

        // creates all the trivia guess options in the html
        $.each(questionOptions, function(index, key){
            $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
        })
    },
    // method to decrement counter and count unanswered if timer runs out
    timerRunning: function(){
        // if timer still has time left and there are still questions left to ask
        if(lwdTrivia.lwdTimer > -1 && lwdTrivia.lwdCurrentSet < Object.keys(lwdTrivia.lwdQuestions).length){
            $('#timer').text(lwdTrivia.lwdTimer);
            lwdTrivia.lwdTimer--;
            if(lwdTrivia.lwdTimer === 4){
                $('#timer').addClass('last-seconds');
            }
        }
        // the time has run out and incrememt unanswered, run result
        else if(lwdTrivia.lwdTimer === -1){
            lwdTrivia.numUnanswered++;
            lwdTrivia.result = false;
            clearInterval(lwdTrivia.lwdTimerId);
            resultId = setTimeout(lwdTrivia.guessResult, 1000);
            $('#life-with-derek-trivia-game-results').html('<h3>Out of time! The answer was ' + Object.values(lwdTrivia.lwdAnswers)[lwdTrivia.lwdCurrentSet] + '</h3>');
        }
        // if all the questions have been shown end the game, show results
        else if(lwdTrivia.lwdCurrentSet === Object.keys(lwdTrivia.lwdQuestions).length){
            // adds results of game (correct, incorrect, unanswered) to the page
            $('#life-with-derek-trivia-game-results').html('<h3>Thank you for playing!</h3>'+
            '<p>Correct: '+ lwdTrivia.numCorrect + '</p>'+
            '<p>Incorrect: '+ lwdTrivia.numIncorrect + '</p>'+
            '<p>Unanswered: '+ lwdTrivia.numUnanswered + '</p>'+
            '<p>Please play again!</p>');

            // hide game section
            $('#life-with-derek-trivia-game').hide();

            // show start button to begin a new game
            $('#start-life-with-derek-trivia').show();
        }
    },
    // method to evaluate the player's answer to a question
    evaluateGuess: function() {
        // timer ID for gameResult setTimeout
        var resultId;

        // the correct answer to the current question being asked
        var currentCorrectAnswer = Object.values(lwdTrivia.lwdAnswers)[lwdTrivia.lwdCurrentSet];

        // if the text of the option picked matches the correct answer of the current question, increment correct
        if($(this).text() === currentCorrectAnswer){
            // turn button green for correct
            $(this).addClass('btn-success').removeClass('btn-info');

            lwdTrivia.correct++;
            clearInterval(lwdTrivia.lwdTimerId);
            resultId = setTimeout(lwdTrivia.guessResult, 1000);
            $('#life-with-derek-trivia-game-results').html('<h3>Correct Answer!</h3>');
        }
        // else th user picked the wrong option, increment incorrect
        else{
            // turn button red for incorrect
            $(this).addClass('btn-danger').removeClass('btn-info');

            lwdTrivia.numIncorrect++;
            resultId = setTimeout(lwdTrivia.guessResult, 1000);
            $('#life-with-derek-trivia-game-results').html('<h3>Incorret Answer! Better luck next time! The correct answer is: ' + currentCorrectAnswer + '</h3>');
        }
    },
    // method to remove previous question results and options
    guessResult: function(){
        //increment to next question set
        lwdTrivia.lwdCurrentSet++;

        // remove the options and results
        $('.option').remove();
        $('#life-with-derek-trivia-game-results h3').remove();

        // begin next question
        lwdTrivia.nextQuestion();
    }
}