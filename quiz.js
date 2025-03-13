function nextQuestion(next) {
    document.querySelectorAll(".question-page").forEach(page => page.style.display = "none");
    document.getElementById(`question-${next}`).style.display = "block";
}

function prevQuestion(prev) {
    document.querySelectorAll(".question-page").forEach(page => page.style.display = "none");
    document.getElementById(`question-${prev}`).style.display = "block";
}

// Load sound effects
// Load sound effects
const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");
const clickSound = new Audio("sounds/click.mp3");
document.querySelectorAll("input[type=radio]").forEach(input => {
    input.addEventListener("click", function () {
        const label = this.parentElement;
        label.style.color = "black"; // Reset color before checking

        if (this.id.includes("correct")) {
            label.style.color = "green"; // Correct answer ✅
            correctSound.play();  // Play correct sound
        } else {
            label.style.color = "red"; // Wrong answer ❌
            wrongSound.play();  // Play wrong sound
        }
    });
});

function checkAnswers() {
    let score = document.querySelectorAll("input[id*=correct]:checked").length;

    // Display the final score at the bottom
    const resultText = `ניקוד: ${score}/3`;
    let resultDiv = document.getElementById("score");
    resultDiv.innerText = resultText;
    resultDiv.style.display = "block";
}


function restartQuiz() {
    clickSound.play(); // Play button click sound
    document.querySelectorAll("input[type=radio]").forEach(input => {
        input.checked = false;
        input.parentElement.style.color = "black"; // Reset colors
    });

    document.getElementById("score").style.display = "none";
}

function goBack() {
    clickSound.play(); // Play button click sound
    window.history.back();
}


const timeUpSound = new Audio("sounds/timeup.mp3");

let timeLeft = 30; // 60-second timer
let timerInterval;

// Start timer when page loads
window.onload = function () {
    startTimer();
};

// Function to start the timer
function startTimer() {
    const quizContainer = document.querySelector(".quiz-container");
    timeUpSound.play();
    // Create timer element
    const timerDisplay = document.createElement("h2");
    timerDisplay.id = "timer";
    timerDisplay.innerText = `⏳ זמן שנותר|الوقت المتبقي: ${timeLeft} ثانية`;
    timerDisplay.style.textAlign = "center";
    timerDisplay.style.color = "red"; // Make it stand out
    timerDisplay.style.marginTop = "20px"; // Add spacing from questions

    // Append timer at the bottom
    quizContainer.appendChild(timerDisplay);

    // Start countdown
    timerInterval = setInterval(function () {
        timeLeft--;
        timerDisplay.innerText = `⏳ זמן שנותר|الوقت المتبقي: ${timeLeft} ثانية`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeUpSound.play();
            timerDisplay.innerText = "⏳ הזמן נגמר|انتهى الوقت!";
            timeUpSound.pause();
            lockQuiz(); // Disable inputs
        }
    }, 1000);
}

// Disable all answers when time runs out
function lockQuiz() {
    document.querySelectorAll("input[type=radio]").forEach(input => {
        input.disabled = true;
    });
}

// Handle answer selection
document.querySelectorAll("input[type=radio]").forEach(input => {
    input.addEventListener("click", function () {
        if (timeLeft > 0) { // Only allow answers while time remains
            const label = this.parentElement;
            label.style.color = "black"; // Reset color before checking

            if (this.id.includes("correct")) {
                label.style.color = "green"; // Correct answer ✅
                correctSound.play();
            } else {
                label.style.color = "red"; // Wrong answer ❌
                wrongSound.play();
            }
        }
    });
});
