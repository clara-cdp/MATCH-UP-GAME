let flippedCards = [];
let matchedCount = 0;
let score = 0;
let matchStartTime = 0;
let timerInterval;
let time = 0;
let timerRunning = false;
let cardCount = 16;

const scoreDisplay = document.getElementById('scoreBox');
const timerDisplay = document.getElementById('seconds');
const gameBoard = document.querySelector('.gameBoard');
const startGameBtn = document.getElementById('startGame');


if (!gameBoard) {
    console.error("Couldn't find the .gameBoard element! Check your HTML class name.");
}

let japanCards = [
    "assets/cards/card1.jpg",
    "assets/cards/card2.jpg",
    "assets/cards/card3.jpg",
    "assets/cards/card4.jpg",
    "assets/cards/card5.jpg",
    "assets/cards/card6.jpg",
    "assets/cards/card7.jpg",
    "assets/cards/card8.jpg",
]

let mosaicCards = [
    "assets/cards/mosaic_1.jpg",
    "assets/cards/mosaic_2.jpg",
    "assets/cards/mosaic_3.jpg",
    "assets/cards/mosaic_4.jpg",
    "assets/cards/mosaic_5.jpg",
    "assets/cards/mosaic_6.jpg",
    "assets/cards/mosaic_7.jpg",
    "assets/cards/mosaic_8.jpg",
]

let dogosCards = [
    "assets/cards/dog_1.jpg",
    "assets/cards/dog_2.jpg",
    "assets/cards/dog_3.jpg",
    "assets/cards/dog_4.jpg",
    "assets/cards/dog_5.jpg",
    "assets/cards/dog_6.jpg",
    "assets/cards/dog_7.jpg",
    "assets/cards/dog_8.jpg",
]

const decks = {
    japan: japanCards,
    mosaic: mosaicCards,
    dogs: dogosCards
}

let currentDeck = japanCards;

function renderCards(cardSet) {
    if (typeof hideWinModal === 'function') {
        hideWinModal();
    }
    gameBoard.innerHTML = '';

    flippedCards = [];
    matchedCount = 0;
    score = 0;
    time = 0;
    timerRunning = false;

    scoreDisplay.innerText = score;
    timerDisplay.innerText = '00';

    clearInterval(timerInterval);

    let allGameCards = [...cardSet, ...cardSet];
    allGameCards.sort(() => Math.random() - 0.5);

    cardCount = allGameCards.length;


    for (let i = 0; i < cardCount; i++) {

        const card = document.createElement('div');
        const currentImage = allGameCards[i];

        card.classList.add('cards');

        card.innerHTML = `
            <div class="cardPosition">
                <div class="cardFront"></div>
                <div class="cardBack">
                <img style="object-fit:cover; "src="${currentImage}" alt="card-icon" ></div>
            </div>`;

        card.addEventListener('click', cardClicked);
        gameBoard.appendChild(card);
    }
}

// card handler
function cardClicked() {

    if (!timerRunning) {
        startTimer();
        timerRunning = true;
        matchStartTime = time;
    }

    if (this.classList.contains('flipped') || flippedCards.length === 2) {
        return;
    }

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkIfCardsMatch()
    }
}

// timer
function startTimer() {

    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        time++;
        timerDisplay.innerText = time;
    }, 1000);

}

// maching game

function checkIfCardsMatch() {

    const [card1, card2] = flippedCards;

    let img1 = card1.querySelector('img').src;
    let img2 = card2.querySelector('img').src;

    if (img1 === img2) {
        matchedCount += 2;

        let secondsTaken = time - matchStartTime;
        score += calculatePoints(secondsTaken);
        scoreDisplay.innerText = score;

        matchStartTime = time;
        flippedCards = [];

        if (matchedCount === cardCount) {
            clearInterval(timerInterval);
            setTimeout(() => showWinModal(score, time), 600);
        }
    } else {
        score = Math.max(0, score - 15);
        scoreDisplay.innerText = score;

        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];

        }, 1000);
    }

}

//points calculator

function calculatePoints(seconds) {
    switch (true) {
        case (seconds <= 3):
            return 200;
        case (seconds <= 7):
            return 100;
        case (seconds <= 11):
            return 70;
        case (seconds <= 15):
            return 50;
        default:
            return 25;
    }
}

// deck selection
document.querySelectorAll('input[name="deck"]').forEach(radio => {
    radio.addEventListener('change', function () {
        currentDeck = decks[this.value];
        renderCards(currentDeck);
    });
});

// background selection
const backgroundImages = {
    bg1: 'assets/bg/bg.jpg',
    bg2: 'assets/bg/bg2.jpg',
    bg3: 'assets/bg/bg3.jpg',
    bg4: 'assets/bg/bg4.jpg',
    bg5: 'assets/bg/bg5.jpg'
};

document.querySelectorAll('input[name="bgType"]').forEach(radio => {
    radio.addEventListener('change', function () {
        const bgUrl = backgroundImages[this.value];
        if (bgUrl) {
            document.documentElement.style.backgroundImage = `url('${bgUrl}')`;
        }
    });
});


// ==========================================
// WIN MODAL & CONFETTI SYSTEM
// ==========================================
const winModal = document.getElementById('winModal');
const modalScore = document.getElementById('modalScore');
const modalTime = document.getElementById('modalTime');
const modalPlayAgain = document.getElementById('modalPlayAgain');
const confettiCanvas = document.getElementById('confettiCanvas');
const confettiCtx = confettiCanvas ? confettiCanvas.getContext('2d') : null;

let confettiActive = false;
let confettiParticles = [];
let confettiAnimationId;

// Game theme colors matching UI palette
const confettiColors = [
    '#ff3d7f', // --accent (pink)
    '#1dd6d0', // --accent-2 (teal)
    '#ffd447', // --accent-3 (yellow)
    '#ffffff', // White
    '#ff8a3d'  // Orange (from start button gradient)
];

class ConfettiParticle {
    constructor() {
        this.reset();
        // Distribute initially so it starts mid-air or cascades down
        if (confettiCanvas) {
            this.y = Math.random() * -confettiCanvas.height;
        }
    }

    reset() {
        if (!confettiCanvas) return;
        this.x = Math.random() * confettiCanvas.width;
        this.y = Math.random() * -50 - 20;
        this.width = Math.random() * 8 + 6;
        this.height = Math.random() * 12 + 8;
        this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        this.vx = Math.random() * 4 - 2;
        this.vy = Math.random() * 3 + 2; // fall speed range
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5 - 2.5;
        this.wobble = Math.random() * 10;
        this.wobbleSpeed = Math.random() * 0.05 + 0.02;
    }

    update() {
        if (!confettiCanvas) return;
        this.x += this.vx + Math.sin(this.wobble) * 0.5;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.wobble += this.wobbleSpeed;

        // Reset if it goes off bottom or sides
        if (this.y > confettiCanvas.height + 20) {
            this.reset();
        }
        if (this.x < -20) {
            this.x = confettiCanvas.width + 10;
        } else if (this.x > confettiCanvas.width + 20) {
            this.x = -10;
        }
    }

    draw() {
        if (!confettiCtx) return;
        confettiCtx.save();
        confettiCtx.translate(this.x + this.width / 2, this.y + this.height / 2);
        confettiCtx.rotate((this.rotation * Math.PI) / 180);
        
        // 3D paper flipping effect
        const scaleX = Math.cos(this.wobble);
        confettiCtx.scale(scaleX, 1);
        
        confettiCtx.fillStyle = this.color;
        confettiCtx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        confettiCtx.restore();
    }
}

function resizeConfettiCanvas() {
    if (!confettiCanvas || !winModal) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

function initConfetti() {
    resizeConfettiCanvas();
    confettiParticles = [];
    const count = 125;
    for (let i = 0; i < count; i++) {
        confettiParticles.push(new ConfettiParticle());
    }
}

function animateConfetti() {
    if (!confettiActive || !confettiCtx || !confettiCanvas) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettiParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    confettiAnimationId = requestAnimationFrame(animateConfetti);
}

function startConfetti() {
    if (!confettiCanvas) return;
    confettiActive = true;
    initConfetti();
    animateConfetti();
    window.addEventListener('resize', resizeConfettiCanvas);
}

function stopConfetti() {
    confettiActive = false;
    cancelAnimationFrame(confettiAnimationId);
    window.removeEventListener('resize', resizeConfettiCanvas);
    if (confettiCtx && confettiCanvas) {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
}

function showWinModal(finalScore, totalTime) {
    if (modalScore) modalScore.innerText = finalScore;
    if (modalTime) modalTime.innerText = `${totalTime}s`;
    if (winModal) winModal.classList.add('active');
    startConfetti();
}

function hideWinModal() {
    if (winModal) winModal.classList.remove('active');
    stopConfetti();
}

// Modal event listeners
if (modalPlayAgain) {
    modalPlayAgain.addEventListener('click', () => {
        renderCards(currentDeck);
    });
}

// Also close modal if clicking outside the modal content box (on the overlay)
if (winModal) {
    winModal.addEventListener('click', (e) => {
        if (e.target === winModal) {
            hideWinModal();
        }
    });
}

// START 
startGameBtn.addEventListener('click', () => {
    renderCards(currentDeck);
});

renderCards(currentDeck);



