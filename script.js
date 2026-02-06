// Your 20 economic terms (same as Python!)
const economicsTerms = {
    "GDP": "Total value of all goods and services produced in a country",
    "Inflation": "General increase in prices and fall in purchasing value of money",
    "Supply": "Amount of a product available for sale",
    "Demand": "Desire for a product by consumers",
    "Monopoly": "When one company controls an entire market",
    "Recession": "Period of economic decline",
    "Interest Rate": "Cost of borrowing money",
    "Stock": "Share of ownership in a company",
    "Dividend": "Payment to shareholders from company profits",
    "Capital": "Money or assets used to start a business",
    "Opportunity Cost": "The loss of something when you choose to do something else",
    "Revenue": "The total amount of money a business earns before any expenses",
    "Profit": "The total amount of money a business earns after calculating expenses",
    "Asset": "A tangible resource that holds present or future economic value",
    "Liability": "An obligation to transfer economic resources to another party in the future",
    "Equity": "Fair and just distribution of resources, opportunities, and outcomes across society",
    "Market Economy": "An economic system where production and prices are determined by unrestricted competition between privately owned businesses",
    "Fiscal Policy": "The use of government spending and taxation to influence economic conditions",
    "Monetary Policy": "A country's central bank managing the money supply and interest rates to do what they want",
    "Unemployment Rate": "The percent of the workforce that is jobless, actively seeking employment, and available to work"
};

// Quiz state
let currentQuestion = 0;
let score = 0;
let quizQuestions = [];
let correctAnswer = "";

// Get elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionEl = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer-btn');
const scoreEl = document.getElementById('score');
const finalScoreEl = document.getElementById('final-score');

// Start quiz
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    // Hide start screen, show quiz
    startScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    
    // Generate 10 random questions
    const terms = Object.keys(economicsTerms);
    quizQuestions = [];
    
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * terms.length);
        const term = terms[randomIndex];
        quizQuestions.push(term);
        terms.splice(randomIndex, 1); // Remove so no duplicates
    }
    
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
document.getElementById('question-number').textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
    const term = quizQuestions[currentQuestion];
    correctAnswer = economicsTerms[term];
    
    // Display question
    questionEl.textContent = `What is ${term}?`;
    
    // Create 4 multiple choice answers
    const allTerms = Object.keys(economicsTerms);
    const wrongTerms = allTerms.filter(t => t !== term);
    
    // Get 3 random wrong answers
    const wrongAnswers = [];
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * wrongTerms.length);
        wrongAnswers.push(economicsTerms[wrongTerms[randomIndex]]);
        wrongTerms.splice(randomIndex, 1);
    }
    
    // Combine and shuffle
    const allAnswers = [correctAnswer, ...wrongAnswers];
    shuffleArray(allAnswers);
    
    // Set button text and click handlers
    answerButtons.forEach((btn, index) => {
        btn.textContent = allAnswers[index];
        btn.onclick = () => checkAnswer(allAnswers[index]);
        btn.disabled = false;
        btn.style.background = '#667eea';
    });
    
    // Update score display
    scoreEl.textContent = `Score: ${score}/${currentQuestion}`;
}

function checkAnswer(selectedAnswer) {
    // Disable all buttons
    answerButtons.forEach(btn => {
        btn.disabled = true;
        
        // Color code the answers with classes
        if (btn.textContent === correctAnswer) {
            btn.classList.add('correct');
        } else if (btn.textContent === selectedAnswer) {
            btn.classList.add('wrong');
            // Check if correct
if (selectedAnswer === correctAnswer) {
    score++;
    // Add a success message
    questionEl.innerHTML = `✅ Correct! <br><br>What is ${quizQuestions[currentQuestion]}?`;
} else {
    // Add wrong feedback
    questionEl.innerHTML = `❌ Wrong! <br><br>What is ${quizQuestions[currentQuestion]}?`;
}
        }
    });
    
  // Check if correct
if (selectedAnswer === correctAnswer) {
    score++;
    // Add a success message
    questionEl.innerHTML = `✅ Correct! <br><br>What is ${quizQuestions[currentQuestion]}?`;
} else {
    // Add wrong feedback
    questionEl.innerHTML = `❌ Wrong! <br><br>What is ${quizQuestions[currentQuestion]}?`;
}
    
    // Next question after 1.5 seconds
    setTimeout(() => {
        currentQuestion++;
        
        // Remove classes for next question
        answerButtons.forEach(btn => {
            btn.classList.remove('correct', 'wrong');
        });
        
        if (currentQuestion < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1500);
}
function showResults() {
function showResults() {
    quizScreen.style.display = 'none';
    resultsScreen.style.display = 'block';
    
    const percentage = Math.round((score / quizQuestions.length) * 100);
    finalScoreEl.textContent = `Your score: ${score}/${quizQuestions.length} (${percentage}%)`;
    
    // Add message based on score
    let message = '';
    if (percentage >= 90) {
        message = '🔥 Outstanding! You\'re ready for your test!';
    } else if (percentage >= 70) {
        message = '💪 Great job! Keep studying!';
    } else if (percentage >= 50) {
        message = '📚 Good effort! Review those terms!';
    } else {
        message = '📖 Keep practicing! You\'ll get there!';
    }
    
    const messageEl = document.createElement('p');
    messageEl.textContent = message;
    messageEl.style.fontSize = '1.3em';
    messageEl.style.marginTop = '20px';
    finalScoreEl.after(messageEl);
}
}

function restartQuiz() {
    resultsScreen.style.display = 'none';
    startScreen.style.display = 'block';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}