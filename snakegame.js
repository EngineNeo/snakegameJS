//TO-DO

// Make apple not spawn on new snake parts
// reset button

const canvas = document.getElementById('game')
const cvs = canvas.getContext('2d');

//Gamestates
let speed = 5;
let gameStatus = true;

//Canvas grid + positions
let tileCount = canvas.width / 21;
let tileSize = tileCount - 1;
let headX = 10;
let headY = 10;

//Snake body variables
const snakeParts = [];
let tailLength = 0;
class SnakePart { //class for the snakes body part
    constructor (x, y){
        this.x = x;
        this.y = y;
    }
}

let score = 0;

function randomPosition(x, y) {
    x = Math.floor(Math.random() * 20 + 1);
    y = Math.floor(Math.random() * 20 + 1);
    for(let i=0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        let partApple = false;
        if (part.x === x && part.y === y) {
            partApple = true;
        }
        while ( x === headX && y === headY || partApple === true) {
            x = Math.floor(Math.random() * 20 + 1);
            y = Math.floor(Math.random() * 20 + 1);
            if (part.x !== x && part.y !== y) {
                partApple = false;
            }
        }
        
    };
    return {
        x: x,
        y: y,
    };
}

let applePos = randomPosition();
let appleX = applePos.x;
let appleY = applePos.y;

// snake speed
let xVel = 0;
let yVel = 0;
let prevVel = [];

//View game loop
function drawGame() {
    changeSnakePosition();
    let gameOver = checkgameOver();
    if (gameOver) {
        return;
    };

    makeScreen();
    appleCollision();
    drawSnake();
    drawApple();
    drawScore();
    gameState();
    gameTime = setTimeout(drawGame, 1000/ speed)
}

function checkgameOver() {
    //Gameover state
    let gameOver = false;

    // Will not result in gameOver in the beginning
    if (yVel === 0 && xVel === 0) {
        return false;
    }

    //Check walls
    if (headX < 0) {
        gameOver = true;
    }
    else if (headX === 21) {
        gameOver = true;
    }
    else if (headY < 0) {
        gameOver = true;
    }
    else if (headY === 21) {
        gameOver = true;
    }

    //Check snake part collision
    for(let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    // Gameover text
    if (gameOver) {
        cvs.font = "7.5rem Roboto";
        let gradient = cvs.createLinearGradient (0, 0, canvas.width, 0);
        gradient.addColorStop('0', 'blue');
        gradient.addColorStop('0.5', 'magenta');
        gradient.addColorStop('1.0', 'red');

        cvs.fillStyle = gradient;

        cvs.fillText('Game Over', canvas.width / 6.5, canvas.height / 1.85)
    }

    return gameOver;    
}

function drawScore() {
    cvs.fillStyle = "white";
    cvs.font = "1rem Roboto";
    cvs.fillText("Score " + score, canvas.width-70, 20)
}

//Drawing the background
function makeScreen() {
    cvs.fillStyle = '#0A0F36';
    cvs.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    for(let i=0; i < snakeParts.length; i++) {
        cvs.fillStyle = `rgb(0, ${(40 + i)} , 0)`;
        let part = snakeParts[i];
        cvs.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
        };

    snakeParts.push(new SnakePart(headX, headY));
    while(snakeParts.length > tailLength 
        && (gameStatus !== false)){
        snakeParts.shift();
    };

    cvs.fillStyle = 'rgb(0, 255, 0)';
    cvs.fillRect(headX * tileCount, headY * tileCount, 
                 tileSize, tileSize)
}

function drawApple() {
    cvs.fillStyle = 'red';
    cvs.fillRect (appleX * tileCount, appleY * tileCount,
                  tileSize, tileSize)
}

function appleCollision() {
    if(appleX === headX && appleY  === headY) {
        applePos = randomPosition();
        appleX = applePos.x;
        appleY = applePos.y;
        tailLength++ //increases tail length;
        score++ //increases score;
        speed+=.10 //increases speed;
    }
}


// Restart game
let restartButton = document.getElementById('restart');
function restartGame() {
    restartButton.onclick = () => {
        headX = 10;
        headY = 10;
        applePos = randomPosition();
        appleX = applePos.x;
        appleY = applePos.y;
        speed = 5;
        xVel = 0;
        yVel = 0;
        score = 0;
        snakeParts.length = 0;
        tailLength = 0;
        drawGame();
    }
}
restartGame();

// Pause button states
let gameButton = document.getElementById('game-status');
function gameState() {  
    if (gameStatus === true) {
        gameButton.onclick = () => {
            prevVel.push(yVel, xVel);
            yVel = 0;
            xVel = 0;
            gameButton.textContent = 'Resume';
            gameStatus = false;
            console.log(prevVel);
        };
    }
    else if (gameStatus === false) {
        gameButton.onclick = () => {
            yVel = prevVel[0];
            xVel = prevVel[1];
            prevVel = [];
            gameButton.textContent = 'Pause';
            gameStatus = true;
        };
    };
};

function changeSnakePosition() {
    headX = headX + xVel;
    headY = headY + yVel;
}

document.body.addEventListener('keydown', keyDown);

const unPause = () => {
    gameButton.textContent = 'Pause';
    gameStatus = true;
    prevVel = [];
}

function keyDown(event) {
    //up
    if (event.keyCode == 87){
        if (yVel === 1)
            return;
        yVel = -1;
        xVel = 0;
        unPause();
    }

    //down
    if (event.keyCode === 83){
        if (yVel === -1)
            return;
        yVel = 1;
        xVel = 0;
        unPause();
    }

    //right
    if (event.keyCode === 68){
        if (xVel === -1)
            return;
        yVel = 0;
        xVel = 1;
        unPause();
    }

    //left
    if (event.keyCode === 65){
        if (xVel === 1)
            return;
        yVel = 0;
        xVel = -1;
        unPause();
    }
}

drawGame();