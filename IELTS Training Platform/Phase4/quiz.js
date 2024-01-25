//COMP 3450:<Zarin, Tazrian, Alex>
document.addEventListener('DOMContentLoaded', function() {
    // Attach an event listener to the button
    var checkButton = document.getElementById('checkButton');
    checkButton.addEventListener('click', checkAnswers);

    function checkAnswers() {
        var q1Answer = document.getElementById('q1').value.trim().toLowerCase();
        var q2Answer = document.getElementById('q2').value.trim().toLowerCase();
        var q3Answer = document.getElementById('q3').value.trim().toLowerCase();
        var q4Answer = document.getElementById('q4').value.trim().toLowerCase();
        var q5Answer = document.getElementById('q5').value.trim().toLowerCase();
        var q6Answer = document.getElementById('q6').value.trim().toLowerCase();
        var q7Answer = document.getElementById('q7').value.trim().toLowerCase();

        var correctAnswers = 0;

        if (q1Answer === document.getElementById('q1').getAttribute('data-answer').toLowerCase()) {
            correctAnswers++;
        }
        if (q2Answer === document.getElementById('q2').getAttribute('data-answer').toLowerCase()) {
            correctAnswers++;
        }
        if (q3Answer === document.getElementById('q3').getAttribute('data-answer').toLowerCase()) {
            correctAnswers++;
        }
        if (q4Answer === document.getElementById('q4').getAttribute('data-answer').toLowerCase()) {
            correctAnswers++;
        }
        if (q5Answer === document.getElementById('q5').getAttribute('data-answer').toLowerCase()) {
            correctAnswers++;
        }
        if (q6Answer === document.getElementById('q6').getAttribute('data-answer').toLowerCase()) {
            correctAnswers++;
        }
        if (q7Answer === document.getElementById('q7').getAttribute('data-answer').toLowerCase()) {
            correctAnswers++;
        }

        alert('You got ' + correctAnswers + ' out of 7 correct!');
    }
});

function checkAnswer() {
  var totalQuestions = 6; 
  var score = 0;

  
  var correctAnswers = {
    p1: 'false',
    p2: 'true',
    p3: 'not given',
    p4: 'true',
    p5: 'false',
    p6: 'not given',
  };

  
  for (var i = 1; i <= totalQuestions; i++) {
    var selectedAnswer = document.querySelector('input[name="p' + i + '"]:checked');
    if (selectedAnswer) {
      if (selectedAnswer.value === correctAnswers['p' + i]) {
        score++;
      }
    }
  }

  
  alert('Your score: ' + score + ' out of ' + totalQuestions);
}