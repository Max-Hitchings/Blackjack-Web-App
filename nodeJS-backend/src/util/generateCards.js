const generateCards = () => {
  const suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
  const values = [
    "Ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
  ];
  const decks = 1;

  let deck = [];

  for (let i = 0; i < decks; i++) {
    for (let i = 0; i < suits.length; i++) {
      for (let x = 0; x < values.length; x++) {
        let card = { Value: values[x], Suit: suits[i] };
        deck.push(card);
      }
    }
  }

  for (let i = deck.length - 1; i > 0; i--) {
    var rand = Math.floor(Math.random() * 51 * decks);
    let j = rand;
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }

  return deck;
};

module.exports = generateCards;
