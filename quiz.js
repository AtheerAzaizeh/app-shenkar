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

document.addEventListener("click", function enableAudio() {
    correctSound.muted = false;
    wrongSound.muted = false;
    clickSound.muted = false;
    timeUpSound.muted = false;

    // Play a short silent sound to "unlock" autoplay on iOS
    const unlock = new Audio("sounds/correct.mp3");
    unlock.play().then(() => {
        console.log("Audio unlocked");
    }).catch(error => console.log("Unlocking audio failed:", error));

    document.removeEventListener("click", enableAudio);
});

// Start Timer Function (Fix for iOS)
function startTimer() {
    const quizContainer = document.querySelector(".quiz-container");

    const timerDisplay = document.createElement("h2");
    timerDisplay.id = "timer";
    timerDisplay.innerText = `⏳ זמן שנותר | الوقت المتبقي: ${timeLeft} שניות`;
    timerDisplay.style.textAlign = "center";
    timerDisplay.style.color = "red";
    timerDisplay.style.marginTop = "20px";

    quizContainer.appendChild(timerDisplay);

    timerInterval = setInterval(function () {
        timeLeft--;
        timerDisplay.innerText = `⏳ זמן שנותר | الوقت المتبقي: ${timeLeft} שניות`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            playTimeUpSound(); // Play the time-up sound safely
            timerDisplay.innerText = "⏳ הזמן נגמר | انتهى الوقت!";
        }
    }, 1000);
}

// Function to play time-up sound with iOS fix
function playTimeUpSound() {
    timeUpSound.play().catch(error => {
        console.log("Time-up sound blocked:", error);
    });
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
