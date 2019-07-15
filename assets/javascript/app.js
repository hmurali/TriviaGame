$(document).ready(function(){
    // event listeners
    $("#time-remaining").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);
})

var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 60,
    timerOn: false,
    timerId: '',
}