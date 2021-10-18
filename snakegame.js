const canvas = document.getElementById('game')
const cvs = canvas.getContext('2d');

//speed the game updates the render
let speed = 3;

let tileCount = canvas.width / 21;
let tileSize = tileCount;
let headX = 10;
let headY = 10;

function randomPosition(x, y) {
    x = Math.floor(Math.random() * 20 + 1);
    y = Math.floor(Math.random() * 20 + 1);
    while (x === 10 || y === 10) {
        x = Math.floor(Math.random() * 20 + 1);
        y = Math.floor(Math.random() * 20 + 1);
    }
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
    makeScreen();
    changeSnakePosition();
    appleCollision();
    drawApple();
    drawSnake();
    setTimeout(drawGame, 1000/ speed)
}

//Drawing the background
function makeScreen() {
    cvs.fillStyle = '#0A0F36';
    cvs.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
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
    }
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