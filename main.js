let players = ["host", "bob"];
let currentPlayer = 0;
let currentCard = null;

const cardEl = document.getElementById("card");
const turnEl = document.getElementById("turn");
const nextBtn = document.getElementById("nextBtn");

const cards = [
  "Ace of Spades",
  "2 of Hearts",
  "King of Diamonds",
  "Queen of Clubs",
  "Joker"
];

nextBtn.onclick = () => {
    cardEl.textContent = cards[Math.floor(Math.random() * cards.length)];
    myTurn = false;
    updateTurn();
};

function updateTurn() {
    currentPlayer = (currentPlayer + 1) % players.length;
    turnEl.textContent = players[currentPlayer] + "'s turn";

}