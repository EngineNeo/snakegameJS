//TO-DO

// Make apple not spawn on new snake parts
// Fix body collision
// Move score above canvas
// Game over logic + text
// Pause & reset button

const canvas = document.getElementById('game')
const cvs = canvas.getContext('2d');

//speed the game updates the render
let speed = 5;

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
        while (x === headX || x === part.x || y === headY || y === part.y) {
            x = Math.floor(Math.random() * 20 + 1);
            y = Math.floor(Math.random() * 20 + 1);
        }; // Apple will not be on top of player at start
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

//View game loop
function drawGame() {
    changeSnakePosition();
    makeScreen();
    appleCollision();
    drawSnake();
    drawApple();
    drawScore();
    pauseGame();
    // console.log(snakeParts)
    gameTime = setTimeout(drawGame, 1000/ speed)
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
    cvs.fillStyle = 'orange';
    for(let i=0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        cvs.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
        };

    snakeParts.push(new SnakePart(headX, headY));
    while(snakeParts.length > tailLength){
        snakeParts.shift();
    };

    cvs.fillStyle = 'green';
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
        tailLength++ //increases taillength;
        score++ //increases score;
        speed+=.10 //increases speed;
    }
}

document.getElementById('pause').onclick

function pauseGame() {
    let pauseButton = document.getElementById('pause');
    pauseButton.onclick = () => {
        clearTimeout(gameTime);
        pauseButton.innerText = 'Resume';};
}


function changeSnakePosition() {
    headX = headX + xVel;
    headY = headY + yVel;
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    //up
    if (event.keyCode == 87){
        if (yVel === 1)
            return;
        yVel = -1;
        xVel = 0;
    }

    //down
    if (event.keyCode === 83){
        if (yVel === -1)
            return;
        yVel = 1;
        xVel = 0;
    }

    //right
    if (event.keyCode === 68){
        if (xVel === -1)
            return;
        yVel = 0;
        xVel = 1;
    }

    //left
    if (event.keyCode === 65){
        if (xVel === 1)
            return;
        yVel = 0;
        xVel = -1;
    }
}

drawGame();