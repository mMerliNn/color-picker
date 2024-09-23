let roundsPlayed = 0;
const maxRounds = 10;
const maxScore = 50;
const gameOverMessage = document.getElementById('game-over-message');

// Get elements from DOM
const randomColorSquare = document.querySelector('.random-color-square');
const pickedColorSquare = document.querySelector('.picked-color-square');
const colorPicker = document.getElementById('color-picker');
const submitBtn = document.getElementById('submit-btn');
const resultDisplay = document.getElementById('result');
const scoreDisplay = document.getElementById('score');
const resetBtn = document.getElementById('reset-btn');
const recentScoresList = document.getElementById('recent-scores');

let randomColor = generateRandomColor();
let score = 0; // initialize score
let recentScores = []; // list for scoreboard

// Generate a random number based on HEX
function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// Set a random color for the randomColorSquare
function setRandomColor() {
    randomColor = generateRandomColor();
    randomColorSquare.style.backgroundColor = randomColor;
};

// Convert hex to RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return {r, g, b};
};

// Compare the picked color with the random color
function getColorDifference(color1, color2) {
    // Convert HEX to RGB
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    // Evaluate color difference with Euclidean distance
    const diff = Math.sqrt(
        Math.pow(rgb1.r - rgb2.r, 2) +
        Math.pow(rgb1.g - rgb2.g, 2) +
        Math.pow(rgb1.b - rgb2.b, 2)
    );
    const maxDiff = 441.673;  // Max possible difference in RGB color space
    const normalizedDiff = (diff / maxDiff).toFixed(2);
    return normalizedDiff;
};

setRandomColor();

// Update pickedColorSquare based on user selection
colorPicker.addEventListener('input', () => {
    pickedColorSquare.style.backgroundColor = colorPicker.value;
});

// Event listener to the submit button
submitBtn.addEventListener('click', () => {
    if (roundsPlayed >= maxRounds) {
        gameOverMessage.textContent = 'Good Job! Reset to play again ~';
        return;
    }

    const pickedColor = colorPicker.value;
    const difference = getColorDifference(randomColor, pickedColor);

    // Score-keeping
    let currentScore = calculateScore(difference);
    score += currentScore;
    scoreDisplay.textContent = `Score: ${score}/${maxScore}`;

    // Add the current score to the recent scores array
    // recentScores.push(currentScore);
    // if (recentScores.length > 10) {
    //     recentScores.shift();  // Updates score
    // }

    // Update the recent scores list display
    recentScores.push(currentScore);
    updateRecentScoresList();

    // Generate a new random color and update the color square
    roundsPlayed++;

    // Hide sumbit button after reaching max rounds
    if (roundsPlayed >= maxRounds) {
        document.getElementById('submit-btn').style.visibility = 'hidden';
        gameOverMessage.textContent = "Good Job! You can reset to play again."
        return;
    } else {
        setRandomColor();
    }
});

// Reset the game when the reset button is clickfed
resetBtn.addEventListener('click', () => {
    resetGameUI();

});

function resetGameUI() {
    score = 0;
    roundsPlayed = 0;
    recentScores = [];
    gameOverMessage.textContent = '';
    scoreDisplay.textContent = `Score: ${score}/50`;
    // Reset the score and recent scores list
    updateRecentScoresList();
    // Clear the result text and reset picked color square
    resultDisplay.textContent = '';
    // pickedColorSquare.style.backgroundColor = '#fff';
    document.getElementById('submit-btn').style.visibility = 'visible';
    setRandomColor();
}

// Score-keeping
function calculateScore(difference) {
    let currentScore = 0;
    if (difference == 0) {
        resultDisplay.textContent = `Perfect Match! ${difference}`;
        resultDisplay.style.color = 'gold';
        currentScore = 10; 
    } else if (difference < 0.1) {
        resultDisplay.textContent = `Good Match! ${difference}`;
        resultDisplay.style.color = 'green';
        currentScore = 5;
    } else if (difference < 0.5) {
        resultDisplay.textContent = `Close! ${difference}`;
        resultDisplay.style.color = 'orange';
        currentScore = 3;

    } else {
        resultDisplay.textContent = `Not even close! ${difference}`;
        resultDisplay.style.color = 'red';
    }
    return currentScore;
}

// Update recent scores list in the DOM
function updateRecentScoresList() {
    // Clears current list
    recentScoresList.innerHTML = '';
    // Add each score to the list as a list item
    recentScores.forEach(function(score, index) {
        const listItem = document.createElement('li');
        listItem.textContent = `Round. ${index + 1}: ${score}`
        recentScoresList.appendChild(listItem);
    });
};