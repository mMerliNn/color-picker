const resultDisplay = document.getElementById('result');
const randomColorSquare = document.querySelector('.random-color-square');
const colorSquares = document.querySelectorAll('.color-square');
let randomColor;
let colorList;

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
                setRandomColor();
                colorOptionAllocate();
            } else {
                resultDisplay.textContent = 'Better luck this time!';
            }
        };
    });
};


setRandomColor();
colorOptionAllocate();
