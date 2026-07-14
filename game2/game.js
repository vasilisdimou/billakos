// -------------------------
// MODEL SELECTION
// -------------------------

const models = [
    { name: "Model 1", src: "models/model1.png" },
    { name: "Model 2", src: "models/model2.png" },
    { name: "Model 3", src: "models/model3.png" }
];

const modelList = document.getElementById("model-list");
const gameDiv = document.getElementById("game");
const selectDiv = document.getElementById("model-select");

let selectedModelImg = null;

models.forEach(m => {
    const img = document.createElement("img");
    img.src = m.src;
    img.onclick = () => startGame(m.src);
    modelList.appendChild(img);
});

// -------------------------
// GAME ENGINE
// -------------------------

function startGame(modelSrc) {
    selectedModelImg = new Image();
    selectedModelImg.src = modelSrc;

    selectDiv.classList.add("hidden");
    gameDiv.classList.remove("hidden");

    initGame();
}

function initGame() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    let x = 50;
    let y = 300;
    let velocityY = 0;
    let gravity = 1;
    let speed = 5;

    const obstacle = { x: 500, y: 320, width: 40, height: 40 };
    const finish = { x: 800, y: 250, width: 80, height: 80 };

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Gravity
        velocityY += gravity;
        y += velocityY;

        if (y > 300) {
            y = 300;
            velocityY = 0;
        }

        // Draw model
        ctx.drawImage(selectedModelImg, x, y - 80, 80, 80);

        // Draw obstacle
        ctx.fillStyle = "brown";
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // Draw finish (BreyerFest)
        ctx.fillStyle = "gold";
        ctx.fillRect(finish.x, finish.y, finish.width, finish.height);

        // Collision with obstacle
        if (x + 80 > obstacle.x && x < obstacle.x + obstacle.width && y > obstacle.y - 40) {
            alert("You hit an obstacle!");
            x = 50;
        }

        // Reached BreyerFest
        if (x + 80 > finish.x) {
            alert("You reached BreyerFest!");
            x = 50;
        }

        requestAnimationFrame(gameLoop);
    }

    gameLoop();

    // Desktop controls
    document.addEventListener("keydown", e => {
        if (e.key === "ArrowRight") x += speed;
        if (e.key === "ArrowLeft") x -= speed;
        if (e.key === "ArrowUp" && y === 300) velocityY = -15;
    });

    // Mobile controls
    document.getElementById("leftBtn").onclick = () => x -= speed;
    document.getElementById("rightBtn").onclick = () => x += speed;
    document.getElementById("jumpBtn").onclick = () => {
        if (y === 300) velocityY = -15;
    };
}
