function nextQuestion(next) {
    document.querySelectorAll(".question-page").forEach(page => page.style.display = "none");
    document.getElementById(`question-${next}`).style.display = "block";
}

function prevQuestion(prev) {
    document.querySelectorAll(".question-page").forEach(page => page.style.display = "none");
    document.getElementById(`question-${prev}`).style.display = "block";
}

function checkAnswers() {
    let score = 0;

    document.querySelectorAll("input[type=radio]").forEach(input => {
        const label = input.parentElement;
        label.style.color = "black"; // Reset color before checking

        if (input.checked) {
            if (input.id.includes("correct")) {
                label.style.color = "green"; // Correct answer ✅
                score++;
            } else {
                label.style.color = "red"; // Wrong answer ❌
            }
        }
    });

    // Display the final score at the bottom
    const resultText = `ניקוד: ${score}/3`;
    let resultDiv = document.getElementById("score");
    resultDiv.innerText = resultText;
    resultDiv.style.display = "block";
}

function restartQuiz() {
    document.querySelectorAll("input[type=radio]").forEach(input => {
        input.checked = false;
        input.parentElement.style.color = "black"; // Reset colors
    });

    document.getElementById("score").style.display = "none";
}

function goBack() {
    window.history.back();
}


