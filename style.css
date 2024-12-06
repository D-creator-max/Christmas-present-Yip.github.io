// Select elements
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const instructions = document.getElementById("instructions");

canvas.width = 800;
canvas.height = 400;

let player, goal, obstacles, collectibles;
let gameActive = false;
let keys = {};
let score = 0;

const messages = [
    "Avoid the chaos!",
    "Listen to the still small voice!",
    "Trust in the guidance.",
    "Keep moving forward.",
    "You're almost there!",
];

// Game object class
class GameObject {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Reset game
function resetGame() {
    player = new GameObject(50, canvas.height - 60, 40, 40, "blue");
    goal = new GameObject(canvas.width - 100, canvas.height - 60, 50, 50, "gold");

    obstacles = Array.from({ length: 5 }, () => {
        return new GameObject(
            Math.random() * canvas.width,
            Math.random() * (canvas.height - 100),
            30,
            30,
            "red"
        );
    });

    collectibles = Array.from({ length: 5 }, () => {
        return new GameObject(
            Math.random() * canvas.width,
            Math.random() * (canvas.height - 100),
            20,
            20,
            "green"
        );
    });

    score = 0;
    instructions.innerText = "Navigate through chaos to reach the still small voice!";
}

// Draw all objects
function drawGameObjects() {
    player.draw();
    goal.draw();
    obstacles.forEach((obj) => obj.draw());
    collectibles.forEach((obj) => obj.draw());
}

// Update player position
function updatePlayer() {
    if (keys["ArrowUp"] && player.y > 0) player.y -= 5;
    if (keys["ArrowDown"] && player.y + player.height < canvas.height) player.y += 5;
    if (keys["ArrowLeft"] && player.x > 0) player.x -= 5;
    if (keys["ArrowRight"] && player.x + player.width < canvas.width) player.x += 5;
}

// Check collisions
function checkCollisions() {
    // Check collision with obstacles
    for (let obstacle of obstacles) {
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            gameActive = false;
            alert("You hit the chaos! Game Over.");
            resetGame();
            return;
        }
    }

    // Check collision with collectibles
    collectibles = collectibles.filter((collectible) => {
        if (
            player.x < collectible.x + collectible.width &&
            player.x + player.width > collectible.x &&
            player.y < collectible.y + collectible.height &&
            player.y + player.height > collectible.y
        ) {
            score += 1;
            instructions.innerText =
                messages[Math.floor(Math.random() * messages.length)];
            return false;
        }
        return true;
    });

    // Check collision with goal
    if (
        player.x < goal.x + goal.width &&
        player.x + player.width > goal.x &&
        player.y < goal.y + goal.height &&
        player.y + player.height > goal.y
    ) {
        gameActive = false;
        alert(`You reached the still small voice! Your score: ${score}`);
        resetGame();
    }
}

// Game loop
function gameLoop() {
    if (!gameActive) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGameObjects();
    updatePlayer();
    checkCollisions();
    requestAnimationFrame(gameLoop);
}

// Start button click event
startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    canvas.style.display = "block";
    gameActive = true;
    resetGame();
    gameLoop();
});

// Keyboard controls
window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

// Touch controls (for mobile)
let touchStartX, touchStartY;

canvas.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
});

canvas.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;

    if (dx > 10) keys["ArrowRight"] = true;
    if (dx < -10) keys["ArrowLeft"] = true;
    if (dy > 10) keys["ArrowDown"] = true;
    if (dy < -10) keys["ArrowUp"] = true;
});

canvas.addEventListener("touchend", () => {
    keys = {};
});

// Initialize game
resetGame();
