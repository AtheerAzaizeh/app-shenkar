function checkAnswers() {
    let score = 0;

    document.querySelectorAll("input[type=radio]").forEach(input => {
        const label = input.parentElement;
        label.style.color = "black"; // إعادة ضبط اللون قبل التصحيح

        if (input.checked) {
            if (input.id.includes("correct")) {
                label.style.color = "green"; // إجابة صحيحة ✅
                score++;
            } else {
                label.style.color = "red"; // إجابة خاطئة ❌
            }
        }
    });

    // عرض النتيجة في الأسفل
    const resultText = `نقاطك: ${score}/3`;
    let resultDiv = document.getElementById("score");
    resultDiv.innerText = resultText;
    resultDiv.style.display = "block";
}

function restartQuiz() {
    document.querySelectorAll("input[type=radio]").forEach(input => {
        input.checked = false;
        input.parentElement.style.color = "black"; // إعادة ضبط الألوان
    });

    document.getElementById("score").style.display = "none";
}

function goBack() {
    window.history.back();
}
