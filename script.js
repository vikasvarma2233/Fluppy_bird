
const score = document.querySelector("#score");
const game = document.querySelector(".game");
const bird = document.querySelector(".bird-png");
const finaltx = document.querySelector("h1");
const ov = document.querySelector("#over");
const rt = document.querySelector("#res")


let birdTop = 200;
let gravity = 2;
let gameRunning = true;
let sco = 0;

// GAME OVER FUNCTION
let sc = setInterval(()=>{
     score.textContent = ` Score :${sco++}`
},1000)
function gameOver() {
    if (!gameRunning) return;

    gameRunning = false;

    finaltx.textContent =  ` Score :${sco}`
    ov.style.display = "flex";

    // alert("Game Over!");

    // location.reload(); // Restart game
}

rt.addEventListener("click",()=>{
      location.reload(); // Restart game
})


// BIRD GRAVITY

let gravityInterval = setInterval(() => {

    if (!gameRunning) return;

    birdTop += gravity;
    bird.style.top = birdTop + "px";

    // Ground collision
    if (birdTop + bird.offsetHeight >= game.clientHeight) {
        gameOver();
    }

    // Ceiling collision
    if (birdTop <= 0) {
        gameOver();
    }

}, 20);


// JUMP

document.addEventListener("keydown", (e) => {

    if (!gameRunning) return;

    if (e.code === "Space") {
        birdTop -= 50;
    }

});


// CREATE PIPES

function createpipe() {

    if (!gameRunning) return;

    const pipeTop = document.createElement("div");
    const pipeBottom = document.createElement("div");

    pipeTop.className = "pipe";
    pipeBottom.className = "pipe";

    let gap = 150;

    // Random top pipe height
    let topHeight = Math.random() * 250 + 50;

    // Bottom pipe height
    let bottomHeight = game.clientHeight - topHeight - gap;

    pipeTop.style.height = topHeight + "px";
    pipeBottom.style.height = bottomHeight + "px";

    pipeTop.style.top = "0px";
    pipeBottom.style.bottom = "0px";

    game.append(pipeTop, pipeBottom);

    let pipeLeft = game.clientWidth;

    pipeTop.style.left = pipeLeft + "px";
    pipeBottom.style.left = pipeLeft + "px";

    let move = setInterval(() => {

        if (!gameRunning) {
            clearInterval(move);
            return;
        }

        pipeLeft -= 2;

        pipeTop.style.left = pipeLeft + "px";
        pipeBottom.style.left = pipeLeft + "px";

        // Collision Detection
        let birdRect = bird.getBoundingClientRect();
        let topRect = pipeTop.getBoundingClientRect();
        let bottomRect = pipeBottom.getBoundingClientRect();

        // Top Pipe Collision
        if (
            birdRect.left < topRect.right &&
            birdRect.right > topRect.left &&
            birdRect.top < topRect.bottom &&
            birdRect.bottom > topRect.top
           
        ) {
            gameOver();
        }

        // Bottom Pipe Collision
        if (
            birdRect.left < bottomRect.right &&
            birdRect.right > bottomRect.left &&
            birdRect.top < bottomRect.bottom &&
            birdRect.bottom > bottomRect.top
        ) {
            gameOver();
        }

        // Remove pipes after leaving screen
        if (pipeLeft < -pipeTop.offsetWidth) {
            pipeTop.remove();
            pipeBottom.remove();
            clearInterval(move);
        }

       
    }, 20);
}




// CREATE PIPE EVERY 2 SEC

let pipeInterval = setInterval(() => {

    if (gameRunning) {
        createpipe();
    }else{
        clearInterval(sc)
    }

}, 2000);
