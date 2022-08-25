const gameBoard = document.getElementById("game-board");
let gameIsActive = false;
let scoreTag = document.getElementById("score");
let score = 1;
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
    if (score > 10)
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
    }, time)
}

function stopTimer() {
    clearInterval(timer);
}

let audio = new Audio("assets/audio/SharingTheNightTogether.mp3");
function resetGame() {
    score = 1;
    scoreTag.innerText = "Score: 0/10";
    audio.pause();
    gameBoard.style.display = "grid";
    stopTimer();
    gameIsActive = false;
    document.getElementById("reset-button").innerText = "Start";
    document.getElementById("game").style.backgroundImage = "none";
    for (let i = 0; i < document.getElementsByClassName("door").length; i++)
    {
        document.getElementsByClassName("door")[i].style.backgroundImage = "url(assets/images/mikedoor.jpg)";
    }
}

function kissMike(ev){
    scoreTag.innerText = `Score: ${score++}/10`;
    ev.target.style.backgroundImage = "url(assets/images/mikedoor.jpg)";
    ev.target.dataset.active = "0";
    new Audio(`assets/audio/kiss${getRandom(6)+1}.mp3`).play();
}
function win(){
    audio = new Audio("assets/audio/SharingTheNightTogether.mp3")
    gameBoard.style.display = "none";
    scoreTag.innerText = "Du vann!";
    stopTimer();
    document.getElementById("game").style.backgroundImage = "url(assets/images/Mike_Ehrmantraut.png)";
    audio.play();
}