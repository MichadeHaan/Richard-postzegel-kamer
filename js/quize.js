fetch('/json/quize.json')
    .then(response => response.json())
    .then(data => {
        var questionElement = document.createElement("h1");
        questionElement.textContent = data.questions[0].question;
        document.getElementById("quizContainer").appendChild(questionElement);

        var optionsElement = document.createElement("ul");
        if (data.questions[0].options) {
            data.questions[0].options.forEach(function(option) {
                var optionElement = document.createElement("h2");
                var checkboxElement = document.createElement("input");
                checkboxElement.type = "checkbox";
                checkboxElement.name = "option";
                var scoreCorrect = localStorage.getItem("scoreCorrect") || "0";
                var scoreIncorrect = localStorage.getItem("scoreIncorrect") || "0";
                checkboxElement.value = option;
                checkboxElement.addEventListener("change", function() {
                             var checkboxes = document.getElementsByName("option");
                            checkboxes.forEach(function(checkbox) {
                                if (checkbox !== checkboxElement) {
                                    checkbox.checked = false;
                                }
                            });
                            var checkedOption = document.querySelector('input[name="option"]:checked');
                            if (checkedOption && checkedOption.value === data.questions[0].answer) {
                                var resultElement = document.createElement("h3");
                                resultElement.textContent = "Goed!";
                                scoreCorrect = parseInt(scoreCorrect) + 1;
                                localStorage.setItem("scoreCorrect", scoreCorrect.toString());
                
                                document.getElementById("quizContainer").appendChild(resultElement);
                            } else {
                                var resultElement = document.createElement("h3");
                                resultElement.textContent = "Fout!";      
                                scoreIncorrect = parseInt(scoreIncorrect) + 1;
                                localStorage.setItem("scoreIncorrect", scoreIncorrect.toString());
                                document.getElementById("quizContainer").appendChild(resultElement);
                            }
                
                            setTimeout(function() {
                                resultElement.remove();
                            }, 2000);

                });
                optionElement.appendChild(checkboxElement);
                optionElement.appendChild(document.createTextNode(option));
                optionsElement.appendChild(optionElement);
            });
        }
        document.getElementById("quizContainer").appendChild(optionsElement);

        var nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.addEventListener("click", function() {
            var scoreCorrect = localStorage.getItem("scoreCorrect") || "0";
            var scoreIncorrect = localStorage.getItem("scoreIncorrect") || "0";
            var totalScore = localStorage.getItem("totalScore") || "0";

            var totalScore = parseInt(scoreCorrect) + parseInt(scoreIncorrect);
            localStorage.setItem("totalScore", totalScore.toString());

            if (totalScore === 10) {
                var scoreElement = document.createElement("h3");
                scoreElement.textContent = "Score: Correct - " + scoreCorrect + ", Incorrect - " + scoreIncorrect;
                document.getElementById("quizContainer").appendChild(scoreElement);

                nextButton.disabled = true;
                var resetButton = document.createElement("button");
                resetButton.textContent = "Reset";
                resetButton.addEventListener("click", function() {
                    localStorage.setItem("scoreCorrect", "0");
                    localStorage.setItem("scoreIncorrect", "0");
                    localStorage.setItem("totalScore", "0");
                    nextButton.disabled = false;
                    scoreElement.style.display = "none";
                    resetButton.style.display = "none";
                });

                document.getElementById("quizContainer").appendChild(resetButton);
            } else {
                var randomIndex = Math.floor(Math.random() * data.questions.length);

                while (data.questions[randomIndex].asked) {
                    randomIndex = Math.floor(Math.random() * data.questions.length);
                }

                data.questions[randomIndex].asked = true;

                questionElement.textContent = data.questions[randomIndex].question;
                optionsElement.innerHTML = "";

                data.questions[randomIndex].options.forEach(function(option) {
                    var optionElement = document.createElement("h2");
                    var checkboxElement = document.createElement("input");
                    checkboxElement.type = "checkbox";
                    checkboxElement.name = "option";
                    checkboxElement.value = option;

                    checkboxElement.addEventListener("change", function() {
                        var checkedOption = document.querySelector('input[name="option"]:checked');
                        if (checkedOption && checkedOption.value === data.questions[randomIndex].answer) {
                            var resultElement = document.createElement("h3");
                            resultElement.textContent = "Goed!";
                            scoreCorrect = parseInt(scoreCorrect) + 1;
                            localStorage.setItem("scoreCorrect", scoreCorrect.toString());

                            document.getElementById("quizContainer").appendChild(resultElement);
                        } else {
                            var resultElement = document.createElement("h3");
                            resultElement.textContent = "Fout!";
                            scoreIncorrect = parseInt(scoreIncorrect) + 1;
                            localStorage.setItem("scoreIncorrect", scoreIncorrect.toString());
                            document.getElementById("quizContainer").appendChild(resultElement);
                        }

                        setTimeout(function() {
                            resultElement.remove();
                        }, 2000);
                        var checkboxes = document.getElementsByName("option");
                        checkboxes.forEach(function(checkbox) {
                            if (checkbox !== checkboxElement) {
                                checkbox.checked = false;
                            }
                        });

                    });
                    optionElement.appendChild(checkboxElement);
                    optionElement.appendChild(document.createTextNode(option));
                    optionsElement.appendChild(optionElement);
                });
            }
        });

        document.getElementById("quizContainer").appendChild(nextButton);
    })
    .catch(error => {
        console.error('Error:', error);
    });
