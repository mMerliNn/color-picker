// const resultDisplay = document.getElementById('result');
// const randomColorSquare = document.querySelector('.random-color-square');
// const colorSquares = document.querySelectorAll('.color-square');
// const resetButton = document.getElementById('reset-btn');
// let randomColor;
// let colorList;


// // Assign random color to the main box
// function setRandomColor() {
//     randomColor = chroma.random();
//     randomColorSquare.style.backgroundColor = randomColor;
// };

// // Clears result message
// function resetScore() {
//     resultDisplay.textContent = '';
// };

// function createColorGradient(){
//     colorList = chroma.scale([randomColor, '#ffffff']).mode('lch').colors(6); // TO-DO: create gradient around the random color
//     colorList = _.shuffle(colorList);
// };

// // 
// function colorOptionAllocate() {
//     createColorGradient();
//     colorSquares.forEach((square, index) => {
//         square.style.backgroundColor = colorList[index];
//         square.onclick = function() {
//             resetScore();
//             if (chroma(square.style.backgroundColor).hex() === chroma(randomColor).hex()) {
//                 resultDisplay.textContent = 'Correct!';
//                 setRandomColor();
//                 colorOptionAllocate();
//             } else {
//                 resultDisplay.textContent = 'Better luck this time!';
//             }
//         };
//     });
// };



// function resetGame() {
//     resultDisplay.textContent = ''; // Clear the result message
//     setRandomColor(); // Reset random color
//     colorOptionAllocate(); // Re-allocate color options
// }

// setRandomColor();
// colorOptionAllocate();

// // Reset Game
// resetButton.addEventListener('click', resetGame);


const resultDisplay = document.getElementById('result');
const randomColorSquare = document.querySelector('.random-color-square');
const colorSquares = document.querySelectorAll('.color-square');
const resetButton = document.getElementById('reset-btn');
const totalScore = document.getElementById('score');
let randomColor;
let colorList;
let countdownDuration = 10;
let countdownInterval;
const countdownDisplay = document.getElementById('countdown');
let score = 0;

// Assign random color to the main box
function setRandomColor() {
    randomColor = chroma.random();
    randomColorSquare.style.backgroundColor = randomColor;
};

// Clears result message
function resetScore() {
    resultDisplay.textContent = '';
};

function createColorGradient(){
    colorList = chroma.scale([randomColor, '#ffffff']).mode('lch').colors(6); // TO-DO: create gradient around the random color
    colorList = _.shuffle(colorList);
};

// 
function colorOptionAllocate() {
    createColorGradient();
    colorSquares.forEach((square, index) => {
        square.style.backgroundColor = colorList[index];
        square.onclick = function() {
            resetScore();
            if (chroma(square.style.backgroundColor).hex() === chroma(randomColor).hex()) {
                resultDisplay.textContent = 'Correct!';
                resultDisplay.style.color = 'orange';
                score ++;
                totalScore.textContent =`${score}`;
                setRandomColor();
                colorOptionAllocate();
            } else {
                resultDisplay.textContent = 'Give it another shot!';
                resultDisplay.style.color = 'red';
                score -= 0.5;
                totalScore.textContent =`${score}`;
            }
        };
    });
};

function startCountdown(duration) {
    let timeRemaining = duration;
    countdownDisplay.innerHTML = `Countdown:<br>${timeRemaining}`;
    resetButton.disabled = true; // Disable reset button during countdown

    countdownInterval = setInterval(function () {
        timeRemaining--;
        countdownDisplay.innerHTML = `Countdown:<br>${timeRemaining}`;
        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            endCountdown();
        }
    }, 1000);
}

// End countdown
function endCountdown() {
    countdownDisplay.textContent = "Time's up!";
    countdownDisplay.innerHTML = `Time's <br>up!`;
    colorSquares.forEach(square => {
        square.onclick = null; // Disable clicking after times up
    });
    resetButton.disabled = false;
    resultDisplay.textContent = 'Good Job!';
}

// Reset game
function resetGame() {
    resultDisplay.textContent = '';
    countdownDisplay.innerHTML = "Countdown:<br>10";
    totalScore.textContent = '0';
    score = 0;
    setRandomColor(); // Reset random color
    colorOptionAllocate(); // Re-allocate color options
    clearInterval(countdownInterval);
    countdownInterval = null; // Reset countdown 
    countdownDisplay.innerHTML = `Countdown:<br>${timeRemaining}`;
}

// Initialize game and start countdown
colorSquares.forEach(square => {
    square.addEventListener('click', function () {
        if (!countdownInterval) { // Start countdown only once
            startCountdown(countdownDuration);
        }
    });
});

// Reset game
resetButton.addEventListener('click', function () {
    resetGame();
});


// Initialize game
setRandomColor();
colorOptionAllocate();

