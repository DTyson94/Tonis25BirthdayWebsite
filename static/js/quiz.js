document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('quiz-container');
    const submitQuizButton = document.getElementById('submit-quiz');
    const quizResult = document.getElementById('quiz-result');

    const quizQuestions = [
        {
            question: "Which popular animated movie was released in 1999?",
            options: ["Toy Story 2", "Shrek", "Finding Nemo", "Monsters Inc."],
            answer: 0
        },
        {
            question: "What was the name of the popular boy band formed in 1999?",
            options: ["NSYNC", "Backstreet Boys", "Westlife", "98 Degrees"],
            answer: 2
        },
        {
            question: "Which operating system did Microsoft release in 1999?",
            options: ["Windows 98", "Windows 2000", "Windows XP", "Windows ME"],
            answer: 1
        },
        {
            question: "What was the name of the hit Britney Spears song released in 1999?",
            options: ["Oops!... I Did It Again", "...Baby One More Time", "Toxic", "Crazy"],
            answer: 1
        },
        {
            question: "Which popular video game console was released by SEGA in 1999?",
            options: ["PlayStation 2", "Nintendo 64", "Dreamcast", "GameCube"],
            answer: 2
        }
    ];

    function renderQuiz() {
        quizQuestions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('quiz-question');
            questionDiv.innerHTML = `
                <p>${index + 1}. ${q.question}</p>
                ${q.options.map((option, i) => `
                    <label>
                        <input type="radio" name="q${index}" value="${i}">
                        ${option}
                    </label>
                `).join('')}
            `;
            quizContainer.appendChild(questionDiv);
        });
    }

    function checkAnswers() {
        let correctAnswers = 0;
        quizQuestions.forEach((q, index) => {
            const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
            if (selectedAnswer && parseInt(selectedAnswer.value) === q.answer) {
                correctAnswers++;
            }
        });
        return correctAnswers;
    }

    renderQuiz();

    submitQuizButton.addEventListener('click', function() {
        const correctAnswers = checkAnswers();
        if (correctAnswers === quizQuestions.length) {
            quizResult.textContent = "Totally tubular! You got all questions right! The secret word is: Unterstes Gefrierfacht";
        } else {
            quizResult.textContent = `You got ${correctAnswers} out of ${quizQuestions.length} questions right. Try again!`;
        }
    });
});
