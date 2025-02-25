class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = [];
    this.cardsClicked = 0; 
    this.pairsGuessed = 0;
  }

  shuffleCards() {
      if (!this.cards) {
        return undefined;
      }
  
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
  
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
  
      // Return the shuffled array
      return this.cards;
    
    
  }

  checkIfPair(card1, card2) {
   
    if (card1 === card2) {
    this.pairsGuessed++ 
    return true;
  } else if (card1 !== card2 ) {
    return false; 
  } 
  }

  checkIfFinished() {
    if (this.pairsGuessed < this.cards.length / 2) {
      return false;
    } else {
      return true;
    }
  }
  }

