const gameBoard = document.getElementById("game-board");
let gameIsActive = false;
let scoreTag = document.getElementById("score");
let score = 1;
let winScore = 15;
let lives = 3;
let lastIndex = 0;
let time = 2000;

gameBoard.onclick = (ev) => {
    if (!gameIsActive) {
        return;
    }
    if (ev.target.dataset.active == "1") {
        kissMike(ev);
    }
    if (score > winScore)
    {
        win();
    }

}

let random;
function getRandom(max) {
    random = Math.floor(Math.random() * max)
    return random;
}

function startGame(){
    if (gameIsActive)
    {
        resetGame();
        return;
    }
    document.getElementById("reset-button").innerText = "Reset";
    
    startTimer();
    gameIsActive = true;
}

let door;
function renderMike() {
    if (document.getElementById(`door-${lastIndex}`).dataset.active == "1")
    {
        lives--;
        if (lives <= 0)
        {
            lose();
        }
        document.getElementById("lives").innerText = `Lives: ${lives}/3`;
        document.getElementById(`door-${lastIndex}`).style.backgroundImage = "url(assets/images/mikedoor.jpg)";
    }        
    lastIndex = getRandom(9);
    door = document.getElementById(`door-${lastIndex}`);
    door.style.backgroundImage = "url(assets/images/Mike_Ehrmantraut.png)";
    door.dataset.active = "1";
}

let timer;
function startTimer() {
    timer = setInterval(() => {
        renderMike();
    }, time);
}

function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        renderMike();
    }, time);
}
let audio = new Audio();
function resetGame() {
    score = 1;
    time = 2000;
    scoreTag.innerText = `Score: 0/${winScore}`;
    lives = 3;
    document.getElementById("lives").innerText = "Lives: 3/3";
    gameBoard.style.display = "grid";
    stopTimer();
    gameIsActive = false;
    document.getElementById("reset-button").innerText = "Start";
    document.getElementById("game").style.backgroundImage = "none";
    for (let i = 0; i < document.getElementsByClassName("door").length; i++)
    {
        document.getElementsByClassName("door")[i].style.backgroundImage = "url(assets/images/mikedoor.jpg)";
    }
    audio.pause();
}

function kissMike(ev) {
    scoreTag.innerText = `Score: ${score++}/${winScore}`;
    ev.target.style.backgroundImage = "url(assets/images/mikedoor.jpg)";
    ev.target.dataset.active = "0";
    new Audio(`assets/audio/kiss${getRandom(6)+1}.mp3`).play();
    time = time / 1.1;
    resetTimer();
}

function win() {
    audio = new Audio("assets/audio/SharingTheNightTogether.mp3");
    gameBoard.style.display = "none";
    scoreTag.innerText = "Du vann!";
    stopTimer();
    document.getElementById("game").style.backgroundImage = "url(assets/images/Mike_Ehrmantraut.png)";
    audio.play();
}

function lose() {
    audio = new Audio("assets/audio/waltuh.mp3");
    document.getElementById("game").style.backgroundImage = "url(assets/images/himler.jpeg)";
    gameBoard.style.display = "none";
    stopTimer();
    scoreTag.innerText = "Du f??rlorade!";
    audio.play();
}
