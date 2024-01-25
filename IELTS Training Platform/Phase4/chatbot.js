//COMP 3450:<Zarin, Tazrian, Alex>
const ielts_speaking_questions = [
          "Tell me about your hometown.",
          "Describe your favorite book or movie.",
          "What do you like to do in your free time?",
          "Discuss a memorable trip you have taken.",
          "Describe a person who has had a significant impact on your life.",
          "What are your future career goals?",
          "Talk about a food dish that is popular in your country.",
      ];

      const feedbacks = [
          "Your answer is well-structured and coherent. Keep practicing!",
          "You've provided a detailed and thoughtful response. Great job!",
          "You're on the right track, but try to elaborate more on your points.",
          "It would be helpful to include specific examples in your answer.",
          "Your answer lacks some clarity. Try to organize your thoughts more effectively.",
          "You might want to work on improving your vocabulary and fluency.",
      ];

      // Function to ask a random question
      function ask_question() {
          const question = ielts_speaking_questions[Math.floor(Math.random() * ielts_speaking_questions.length)];
          return question;
      }

      function provideRandomFeedback() {
          const randomIndex = Math.floor(Math.random() * feedbacks.length);
          return feedbacks[randomIndex];
      }

      // Function to evaluate an answer (modify as needed)
      function evaluateUserAnswer(userAnswer) {
          // Implement your answer evaluation logic here
          // Return feedback based on the evaluation
          const feedback = provideRandomFeedback(); // This provides random feedback
          return feedback;
      }

// Function to handle user input and chatbot responses
function handleUserInput() {
    const userInput = document.getElementById('userInput').value.toLowerCase().trim(); // Convert to lowercase and trim
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'user-message';
    userMessageDiv.textContent = 'You: ' + userInput;
    const chatlog = document.getElementById('chatlog');
    chatlog.appendChild(userMessageDiv);

    if (userInput.includes('hello') || userInput.includes('hey') || userInput.includes('hi') || userInput.includes('Good')){
        // Handle greeting responses
        const greeting =
            "Hello! I'm here to help you practice for the IELTS speaking test. Let's get started. You can say 'question' to get a speaking topic or 'exit' to finish the speaking session";
        displayResponse(greeting);
    } else if (userInput.includes('bye') || userInput.includes('exit')) {
        // Handle exit responses
        displayResponse("Goodbye! If you have more questions, feel free to come back.");
    } else if (userInput.includes('question')) {
        // Handle requesting a question
        const question = ask_question();
        displayResponse("Chatbot: " + question);
    } else if (userInput.includes('evaluate') || userInput.includes('feedback')) {
        // Handle requesting feedback
        const userAnswer = getUserAnswer(); // Implement a function to get the user's answer
        if (userAnswer) {
            const feedback = evaluateUserAnswer(userAnswer);
            displayResponse("Chatbot: " + feedback);
        } else {
            displayResponse("Chatbot: Please provide an answer before requesting feedback.");
        }
    } else {
        // Handle other user responses
        const feedback = evaluateUserAnswer(userInput);
        displayResponse("Chatbot: " + feedback);
    }

    // Clear the user input field
    document.getElementById('userInput').value = '';
}

      // Function to display chatbot responses in the chatlog
      function displayResponse(response) {
          const chatlog = document.getElementById('chatlog');
          const responseDiv = document.createElement('div');
          responseDiv.className = 'response';
          responseDiv.textContent = response;
          chatlog.appendChild(responseDiv);
      }

      // Add event listener to handle user input
      document.getElementById('userInput').addEventListener('keypress', function (e) {
          if (e.key === 'Enter') {
              handleUserInput();
          }
      });



