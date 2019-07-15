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
}