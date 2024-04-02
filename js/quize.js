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
                checkboxElement.value = option;
                checkboxElement.addEventListener("change", function() {
                    var checkboxes = document.getElementsByName("option");
                    checkboxes.forEach(function(checkbox) {
                        if (checkbox !== checkboxElement) {
                            checkbox.checked = false;
                        }
                    });

                    var buttonElement = document.createElement("button");
                    buttonElement.textContent = "Check Answer";
                    buttonElement.addEventListener("click", function() {
                        if (checkboxElement.checked && option === data.questions[0].answer) {
                            var resultElement = document.createElement("h3");
                            resultElement.textContent = "Goed!";
                            document.getElementById("quizContainer").appendChild(resultElement);
                        } else {
                            var resultElement = document.createElement("h3");
                            resultElement.textContent = "Fout!";
                            document.getElementById("quizContainer").appendChild(resultElement);
                        }

                        setTimeout(function() {
                            buttonElement.remove();
                            resultElement.remove();
                        }, 2000);
                    });

                    document.getElementById("quizContainer").appendChild(buttonElement);
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
            // Generate a random index for the next question
            var randomIndex = Math.floor(Math.random() * data.questions.length);

            // Check if the question has already been asked
            while (data.questions[randomIndex].asked) {
                randomIndex = Math.floor(Math.random() * data.questions.length);
            }

            // Mark the current question as asked
            data.questions[randomIndex].asked = true;

            // Update the question and options
            questionElement.textContent = data.questions[randomIndex].question;
            optionsElement.innerHTML = "";

            data.questions[randomIndex].options.forEach(function(option) {
                var optionElement = document.createElement("h2");
                var checkboxElement = document.createElement("input");
                checkboxElement.type = "checkbox";
                checkboxElement.name = "option";
                checkboxElement.value = option;
                checkboxElement.addEventListener("change", function() {
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

            var buttonElement = document.createElement("button");
            buttonElement.textContent = "Check Answer";
            buttonElement.addEventListener("click", function() {
                var checkedOption = document.querySelector('input[name="option"]:checked');
                if (checkedOption && checkedOption.value === data.questions[randomIndex].answer) {
                    var resultElement = document.createElement("h3");
                    resultElement.textContent = "Goed!";
                    document.getElementById("quizContainer").appendChild(resultElement);
                } else {
                    var resultElement = document.createElement("h3");
                    resultElement.textContent = "Fout!";
                    document.getElementById("quizContainer").appendChild(resultElement);
                }

                setTimeout(function() {
                    buttonElement.remove();
                    resultElement.remove();
                }, 2000);
            });

            document.getElementById("quizContainer").appendChild(buttonElement);
        });

        document.getElementById("quizContainer").appendChild(nextButton);
    })
    .catch(error => {
        console.error('Error:', error);
    });
