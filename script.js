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
            setTimeout(() => alert(`You WON! Final Score: ${score}`), 600);
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


// START 
startGameBtn.addEventListener('click', () => {
    renderCards(currentDeck);
});

renderCards(currentDeck);



