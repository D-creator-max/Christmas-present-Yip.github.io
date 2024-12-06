const questions = [
  {
    category: "Love and Compassion",
    question: "Finish the verse: “Greater love has no one than this, than to lay down one’s life for his ______.”",
    answers: ["Friends", "Family", "Neighbors", "Enemies"],
    correct: "Friends"
  },
  {
    category: "Love and Compassion",
    question: "In which Gospel does Jesus declare the two greatest commandments?",
    answers: ["John", "Luke", "Matthew", "Mark"],
    correct: "Matthew"
  },
  {
    category: "Love and Compassion",
    question: "According to Matthew 22:37-40, what are the two greatest commandments?",
    answers: [
      "Love the Lord your God with all your heart, soul, and mind; and love your neighbor as yourself.",
      "Do not lie; love your neighbor.",
      "Keep the Sabbath holy; do not steal.",
      "Love your family and friends only."
    ],
    correct: "Love the Lord your God with all your heart, soul, and mind; and love your neighbor as yourself."
  },
  {
    category: "Trust",
    question: "What does Proverbs 3:5-6 advise us to trust in?",
    answers: [
      "The Lord with all your heart, and not your own understanding.",
      "Your riches.",
      "Fame and power.",
      "Your instincts."
    ],
    correct: "The Lord with all your heart, and not your own understanding."
  },
  {
    category: "Trust",
    question: "According to Jeremiah 17:7-8, the man who trusts in the Lord is compared to what?",
    answers: ["A tree planted by the waters", "A rock", "A river", "A house"],
    correct: "A tree planted by the waters"
  },
  {
    category: "Worship",
    question: "How did King David express his worship when the Ark of the Covenant entered Jerusalem?",
    answers: [
      "He danced before the Lord with all his might.",
      "He recited Psalms.",
      "He made a speech.",
      "He fasted."
    ],
    correct: "He danced before the Lord with all his might."
  },
  {
    category: "God’s Promises for Policemen",
    question: "What does Matthew 5:9 say about peacemakers?",
    answers: [
      "Blessed are the peacemakers, for they shall be called the children of God.",
      "They will inherit the earth.",
      "They will be wealthy.",
      "They will have no challenges."
    ],
    correct: "Blessed are the peacemakers, for they shall be called the children of God."
  },
  {
    category: "Deep Dive: Love, Trust, and Worship",
    question: "What are the two actions Jesus asked His Father to do for His persecutors?",
    answers: [
      "Forgive them and show them mercy.",
      "Punish them and bless others.",
      "Give them wisdom and grace.",
      "Ignore them and focus on His followers."
    ],
    correct: "Forgive them and show them mercy."
  }
];


const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const instructions = document.getElementById('instructions');

canvas.width = window.innerWidth * 0.9;
canvas.height = 400;

let player, goal, obstacles, collectibles;
let gameActive = false;
let keys = {};
let score = 0;
let messages = [
    "Avoid the chaos!",
    "Listen to the still small voice!",
    "Trust in the guidance.",
    "Keep moving forward.",
    "You're almost there!"
];

// Initialize player and objects
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

function resetGame() {
    // Player
    player = new GameObject(50, canvas.height - 60, 40, 40, "blue");

    // Goal
    goal = new GameObject(canvas.width - 100, canvas.height - 60, 50, 50, "gold");

    // Obstacles (chaos)
    obstacles = Array.from({ length: 5 }, () => {
        return new GameObject(
            Math.random() * canvas.width,
            Math.random() * (canvas.height - 100),
            30,
            30,
            "red"
        );
    });

    // Collectibles (wisdom)
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
    obstacles.forEach(obj => obj.draw());
    collectibles.forEach(obj => obj.draw());
}

// Update player position
function updatePlayer() {
    if (keys['ArrowUp'] && player.y > 0) player.y -= 5;
    if (keys['ArrowDown'] && player.y + player.height < canvas.height) player.y += 5;
    if (keys['ArrowLeft'] && player.x > 0) player.x -= 5;
    if (keys['ArrowRight'] && player.x + player.width < canvas.width) player.x += 5;
}

// Check collisions
function checkCollisions() {
    // With obstacles
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

    // With collectibles
    collectibles = collectibles.filter(collectible => {
        if (
            player.x < collectible.x + collectible.width &&
            player.x + player.width > collectible.x &&
            player.y < collectible.y + collectible.height &&
            player.y + player.height > collectible.y
        ) {
            score += 1;
            instructions.innerText = messages[Math.floor(Math.random() * messages.length)];
            return false; // Remove collected item
        }
        return true;
    });

    // With goal
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
startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    canvas.style.display = 'block';
    gameActive = true;
    resetGame();
    gameLoop();
});

// Keyboard controls
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

// Touch controls (for mobile)
let touchStartY, touchStartX;
canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
});

canvas.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;
    if (dx > 10) keys['ArrowRight'] = true;
    if (dx < -10) keys['ArrowLeft'] = true;
    if (dy > 10) keys['ArrowDown'] = true;
    if (dy < -10) keys['ArrowUp'] = true;
});

canvas.addEventListener('touchend', () => {
    keys = {};
});

// Initialize game
resetGame();
