window.onload = function() {
    document.querySelector('.cover img').classList.add('fade-in');
    setInterval(changeImage, 3000); 
};

let imageIndex = 0;

function changeImage() {
    const drVegapunkImage = document.getElementById('drVegapunkImage');
    if (imageIndex === 0) {
        drVegapunkImage.src = "../assets/dr.vegapunk2.png";
        imageIndex = 1;
    } else {
        drVegapunkImage.src = "../assets/dr.vegapunk.png";
        imageIndex = 0;
    }
}


const texts = [
    "Hi, I am Dr. Vegapunk. Chemical reactions are fascinating phenomena where atoms rearrange themselves to form new substances with different properties.",
];

const questions = [
    { question: "What is a chemical reaction?", answer: "c", choices: ["A. Reactant to product", "B. Physical change", "C. Substance transformation"] },
    { question: "Which of the following is a product of photosynthesis?", answer: "c", choices: ["A. Oxygen", "B. Glucose", "C. Carbon Dioxide"] },
    { question: "What type of bond forms between atoms in a covalent bond?", answer: "b", choices: ["A. Ionic", "B. Shared electrons", "C. Hydrogen"] },
    { question: "What is the chemical symbol for water?", answer: "b", choices: ["A. H2O", "B. H2O2", "C. HOH"] },
    { question: "What is the process by which a solid changes directly to a gas?", answer: "a", choices: ["A. Sublimation", "B. Evaporation", "C. Condensation"] },
    { question: "Which gas is most abundant in Earth's atmosphere?", answer: "a", choices: ["A. Oxygen", "B. Nitrogen", "C. Carbon dioxide"] },
    { question: "What is the pH of pure water?", answer: "b", choices: ["A. 5", "B. 10", "C. 7"] },
    { question: "What is the chemical formula for table salt?", answer: "c", choices: ["A. NaCl", "B. NaO", "C. NaCl2"] },
    { question: "What element has the chemical symbol 'Fe'?", answer: "a", choices: ["A. Silver", "B. Gold", "C. Iron"] },
    { question: "Which gas is responsible for the color of the Earth's sky?", answer: "c", choices: ["A. Oxygen", "B. Carbon dioxide", "C. Nitrogen"] }
];


const typingText = document.getElementById('typing-text');
const questionDiv = document.getElementById('question');
const questionText = document.getElementById('question-text');
const choices = document.querySelectorAll('.choice');
const nextButton = document.getElementById('next-btn');
let index = 0;
let score = 0;

function type() {
    if (index < texts[0].length) {
        typingText.innerHTML += texts[0].charAt(index);
        index++;
        setTimeout(type, 10);
    } else {
        nextButton.style.display = "block";
    }
}

function nextParagraph() {
    index = 0;
    typingText.innerHTML = "";
    texts.shift();
    if (texts.length > 0) {
        type();
    } else {
        nextButton.style.display = "none";
        showQuestion();
    }
}

function showQuestion() {
    const currentQuestion = questions.shift();
    if (currentQuestion) {
        questionText.textContent = currentQuestion.question;
        currentQuestion.choices.forEach((choice, index) => {
            choices[index].textContent = choice;
            choices[index].disabled = false;
            choices[index].style.backgroundColor = "";
        });
        questionDiv.style.display = "block";
    }
}

function showQuestion() {
    const currentQuestion = questions.shift();
    if (currentQuestion) {
        questionText.textContent = currentQuestion.question;
        currentQuestion.choices.forEach((choice, index) => {
            choices[index].textContent = choice;
            choices[index].disabled = false;
            choices[index].style.backgroundColor = "";
        });
        questionDiv.style.display = "block";
        
        // Display the score
        const scoreDisplay = document.getElementById('scoreDisplay');
        scoreDisplay.textContent = `Score: ${score}`;
    }
}

function checkAnswer(event) {
    const selectedAnswer = event.target.dataset.answer;
    console.log("Selected answer:", selectedAnswer); 
    if (!questions[0]) {
        if (score < 4) {
            const totalQuestions = questions.length;
            const percentage = (score / totalQuestions) * 100;
            window.location.href = `../pages/tryagain.html?score=${score}`;
        }else{
            window.location.href = `../pages/introductiontoprison.html`;
         
        }    
    }
    if (selectedAnswer === questions[0].answer) {
        event.target.style.backgroundColor = "green";
        score++;
    } else {
        event.target.style.backgroundColor = "red";
        choices.forEach(choice => {
            if (choice.dataset.answer === questions[0].answer) {
                choice.style.backgroundColor = "green";
            }
        });
    }
    choices.forEach(choice => {
        choice.disabled = true;
    });
    setTimeout(showQuestion, 1000); // Show next question after 1 second
}

type();

nextButton.addEventListener('click', nextParagraph);
choices.forEach(choice => {
    choice.addEventListener('click', checkAnswer);
});
