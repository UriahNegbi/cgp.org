document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('quizForm');
    const nextButton = document.getElementById('nextButton');
    const submitButton = document.getElementById('submitButton');
    const installButton = document.getElementById('installButton');
    const questions = document.querySelectorAll('.question');
    let currentQuestion = 0;

    nextButton.addEventListener('click', function() {
        const currentQuestionElement = questions[currentQuestion];
        if (!currentQuestionElement.querySelector('input:checked')) {
            alert('Please select an answer before proceeding.');
            return;
        }

        currentQuestion++;
        if (currentQuestion < questions.length) {
            questions.forEach((question, index) => {
                question.classList.toggle('active', index === currentQuestion);
            });
        }
        if (currentQuestion === questions.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'block';
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const resultDiv = document.getElementById('result');
        let Diver = 0;
        let Programmer = 0;
        let Investor = 0;
        let Chef = 0;
        let Artist = 0;
        let Teacher = 0;
        let Analyst = 0;

        const responses = {
            money: document.querySelector('input[name="money"]:checked').value,
            cowardlyPerson: document.querySelector('input[name="cowardlyPerson"]:checked').value,
            house: document.querySelector('input[name="house"]:checked').value,
            numbers: document.querySelector('input[name="numbers"]:checked').value,
            team: document.querySelector('input[name="team"]:checked').value,
            creative: document.querySelector('input[name="creative"]:checked').value,
            publicSpeaking: document.querySelector('input[name="publicSpeaking"]:checked').value,
            workEnvironment: document.querySelector('input[name="workEnvironment"]:checked').value,
        };

        function allocatePoints(answers, points) {
            answers.forEach(answer => {
                switch (answer) {
                    case '1500$ - 2000$':
                        Diver += points.low;
                        Teacher += points.low;
                        break;
                    case '3500$ - 4000$':
                        Chef += points.mid;
                        Artist += points.mid;
                        Teacher += points.mid;
                        break;
                    case '10,000$ - 15,000$':
                        Programmer += points.high;
                        Chef += points.high;
                        Artist += points.high;
                        break;
                    case '15,000$ - 20,000$':
                        Investor += points.veryHigh;
                        Programmer += points.veryHigh;
                        Artist += points.veryHigh;
                        break;
                }
            });
        }

        allocatePoints([responses.money], { low: 1, mid: 2, high: 3, veryHigh: 4 });

        switch (responses.cowardlyPerson) {
            case '1':
                Diver += 3;
                break;
            case '2':
                Investor += 2;
                break;
            case '3':
                Teacher += 2;
                break;
            case '4':
                Programmer += 1;
                break;
        }

        if (responses.house === 'yes') {
            Programmer += 3;
            Artist += 2;
        } else if (responses.house === 'no') {
            Diver += 3;
            Teacher += 2;
        } else if (responses.house === 'i do not care') {
            Investor += 3;
            Chef += 2;
        }

        if (responses.numbers === 'yes') {
            Analyst += 3;
            Programmer += 2;
        } else if (responses.numbers === 'no') {
            Artist += 3;
            Diver += 2;
        } else if (responses.numbers === 'sometimes') {
            Teacher += 2;
            Chef += 1;
        }

        if (responses.team === 'love it') {
            Teacher += 3;
            Chef += 2;
        } else if (responses.team === 'okay with it') {
            Programmer += 3;
            Artist += 2;
        } else if (responses.team === 'prefer solo') {
            Investor += 3;
            Diver += 2;
        }

        if (responses.creative === 'yes') {
            Artist += 3;
            Chef += 2;
        } else if (responses.creative === 'no') {
            Analyst += 3;
            Teacher += 2;
        } else if (responses.creative === 'sometimes') {
            Programmer += 2;
            Diver += 1;
        }

        if (responses.publicSpeaking === 'yes') {
            Teacher += 3;
            Artist += 2;
        } else if (responses.publicSpeaking === 'no') {
            Analyst += 3;
            Diver += 2;
        } else if (responses.publicSpeaking === 'depends on the situation') {
            Programmer += 2;
            Chef += 1;
        }

        if (responses.workEnvironment === 'structured') {
            Analyst += 3;
            Teacher += 2;
        } else if (responses.workEnvironment === 'flexible') {
            Artist += 3;
            Diver += 2;
        } else if (responses.workEnvironment === 'both') {
            Programmer += 2;
            Chef += 1;
        }

        const roles = [
            { name: 'Diver', points: Diver },
            { name: 'Programmer', points: Programmer },
            { name: 'Investor', points: Investor },
            { name: 'Chef', points: Chef },
            { name: 'Artist', points: Artist },
            { name: 'Teacher', points: Teacher },
            { name: 'Analyst', points: Analyst }
        ];

        roles.sort((a, b) => b.points - a.points);

        resultDiv.innerHTML = `
            <h2>Quiz Results</h2>
            <p>Your recommended career path is: <strong>${roles[0].name}</strong></p>
            <ul>
                ${roles.map(role => `<li>${role.name}: ${role.points} points</li>`).join('')}
            </ul>
        `;

        // Hide questions and submit button, (show result)
        form.style.display = 'none';
        resultDiv.style.display = 'block';
        installButton.style.display = 'block';
    });

    installButton.addEventListener('click', function() {
        installButton.style.display = 'none';

        html2canvas(document.body).then(function(canvas) {
            const link = document.createElement('a');
            link.download = 'quiz_screenshot.png';
            link.href = canvas.toDataURL();
            link.click();
            installButton.style.display = 'block';
        });
    });
});
