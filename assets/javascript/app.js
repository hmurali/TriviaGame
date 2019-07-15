$(document).ready(function(){
    // event listeners
    $("#time-remaining").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);
})

var trivia = {
    // trivia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 60,
    timerOn: false,
    timerId: '',
    // questions options and answers data
    questions: {
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
    options: {
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
    answers: {
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
    startGame: function(){
        // resetting game results
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);

        // show game section
        $('#life-with-derek-trivia-game').show();

        // empty last results
        $('#life-with-derek-trivia-game-results').html('');

        // show timer
        $('#timer').text(trivia.timer);

        // remove start button
        $('#start').hide();

        $('#time-remaining').show();

        // ask first question
        trivia.nextQuestion();
    },
    // method to loop through and display questions and options
    nextQuestion: function(){
        //set timer to 10 seconds for each question
        trivia.timer = 10;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        // to prevent timer speed up
        if(!trivia.timerOn){
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }

        // gets all questions then indexes the current questions
        var questionsContent = Object.value(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);

        // an array of all the user options for the current question
        var questionOptions = Object.values(trivia.options)[trivia.currentSet];

        // creates all the trivia guess options in the html
        $.each(questionOptions, function(index, key){
            $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
        })
    },
    // method to decrement counter and count unanswered if timer runs out
    timerRunning: function(){
        // if timer still has time left and there are still questions left to ask
        if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
            $('#timer').text(trivia.timer);
            trivia.timer--;
            if(trivia.timer === 4){
                $('#timer').addClass('last-seconds');
            }
        }
        // the time has run out and incrememt unanswered, run result
        else if(trivia.timer === -1){
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivaia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
        }
        // if all the questions have been shown end the game, show results
        else if(trivia.currentset === Object.keys(trivia.questions).length){
            // adds results of game (correct, incorrect, unanswered) to the page
            $('#results').html('<h3>Thank you for playing!</h3>'+
            '<p>Correct: '+ trivia.correct + '</p>'+
            '<p>Incorrect: '+ trivia.incorrect + '</p>'+
            '<p>Unanswered: '+ trivia.unanswered + '</p>'+
            '<p>Please play again!</p>');

            // hide game section
            $('#life-with-derek-trivia-game').hide();

            // show start button to begin a new game
            $('#start').show();
        }
    },
}