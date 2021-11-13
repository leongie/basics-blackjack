var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["❤", "💎", "♣", "♠"];
  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "👸";
      } else if (cardName == 13) {
        cardName = "🤴";
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      // Add the new card to the deck
      cardDeck.push(card);
      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }
    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }
  // Return the completed card deck
  return cardDeck;
};
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};
// Deck is shuffled.
var shuffledDeck = shuffleCards(makeDeck());
var gameMode = "dealing cards";
var playerCard1 = {};
var playerCard2 = {};
var computerCard1 = {};
var computerCard2 = {};
var main = function (input) {
  //User clicks Submit to deal cards. -game mode1
  if (gameMode == "dealing cards") {
    computerCard1 = shuffledDeck.pop();
    computerCard2 = shuffledDeck.pop();
    playerCard1 = shuffledDeck.pop();
    playerCard2 = shuffledDeck.pop();
    var myOutputValue =
      "You Draw" +
      playerCard1.name +
      " " +
      " of " +
      playerCard1.suit +
      " " +
      "and" +
      playerCard2.name +
      " " +
      "of " +
      playerCard2.suit +
      " " +
      "." +
      "Computer draw " +
      " " +
      computerCard1.name +
      " of " +
      computerCard1.suit +
      " " +
      "and" +
      computerCard2.name +
      "of" +
      computerCard2.suit +
      " " +
      ".";

    //The cards are analysed for game winning conditions, e.g. Blackjack. / gameMode = 1 ==> blackjack
    if (
      (computerCard1.rank == 1 && computerCard2.rank > 10) ||
      (computerCard1.rank > 10 && computerCard2.rank == 1)
    ) {
      myOutputValue =
        myOutputValue + "Computer Wins with BJ,better luck next time";
    } else gameMode == "comparing scores";
    // !!! if it's blackjack, shall we change the game mode to the last game mode to end the game immediately? no need to go through hit/stand/computer turn alr
    if (
      (playerCard1.rank == 1 && playerCard2.rank > 10) ||
      (playerCard2.rank > 10 && playerCard1.rank == 1)
    ) {
      myOutputValue = myOutputValue + "Player Wins with BJ,!!!!";
    } else gameMode == "comparing scores";

    gameMode = "player turn, hit or stand";
    // !!! removed duplicate of blackjack check
  } else if (gameMode == "player turn, hit or stand") {
    if (playerCard1.rank > 10) {
      playerCard1.rank = 10;
    }
    if (playerCard2.rank > 10) {
      playerCard2.rank = 10;
    }
    if (computerCard1.rank > 10) {
      computerCard1.rank = 10;
    }
    if (computerCard2.rank > 10) {
      computerCard2.rank = 10;
    }
    var playerScore = playerCard1.rank + playerCard2.rank;
    var computerScore = computerCard1.rank + computerCard2.rank;
    var myOutputValue = "Value on hand is" + playerScore;
    // !!! removed third card logic for simplicity
    //The user decides whether to hit or stand, using the submit button -game mode 2to submit their choice.
    // !!! removed blackjack check - we only need to do this once (after dealing)
    // !!! shifted this block of code up - remember that we need to amend the rank BEFORE we calculate the score, if not the score will not be correct for J Q K
    gameMode = "comparing scores";
  } else if ((gameMode = "comparing scores")) {
    var playerScore = playerCard1.rank + playerCard2.rank;
    var computerScore = computerCard1.rank + computerCard2.rank;
    // !!! removed blackjack check - we only need to do this once
    var myOutputValue = "you have";
    if (playerCard1.rank > 10) {
      playerCard1.rank = 10;
    }
    if (playerCard2.rank > 10) {
      playerCard2.rank = 10;
    }
    var playerScore = playerCard1.rank + playerCard2.rank;
    // !!! removed third card logic
    if (computerCard1.rank > 10) {
      computerCard1.rank = 10;
    }
    if (computerCard2.rank > 10) {
      computerCard2.rank = 10;
    }
    // !!! removed third card logic
    console.log("playerCard");
    console.log(playerCard1.rank, playerCard2.rank);
    console.log("computerCard");
    console.log(computerCard1.rank, computerCard2.rank);
    console.log("scores");
    var myOutputValue =
      "Your score is: " +
      playerScore +
      ", computer score is: " +
      computerScore +
      "<br>";
    if (playerScore > computerScore) {
      myOutputValue = myOutputValue + "Player wins!";
    } else if (computerScore > playerScore) {
      myOutputValue = "Computer wins.";
    } else {
      myOutputValue = "It's a tie.";
    }
    // !!! tidied curly brackets
  }
  return myOutputValue;
};
