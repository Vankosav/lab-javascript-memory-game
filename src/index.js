const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards);

let isProcessing = false;

window.addEventListener('load', (event) => {
  let html = '';
  memoryGame.shuffleCards();
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;
  const cardsClicked = document.querySelector("#cards-clicked"); 
 
  const pairsGuessed = document.querySelector("#pairs-guessed"); 

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      if (isProcessing || card.classList.contains("turned")) {
        return;
      }

      card.classList.add("turned");
      memoryGame.pickedCards.push(card);
      memoryGame.cardsClicked++;
     cardsClicked.innerHTML = memoryGame.cardsClicked;
      console.log("I just clicked " + cardsClicked);

      if (memoryGame.pickedCards.length === 2) {
        isProcessing = true;
        const check = memoryGame.checkIfPair(
          memoryGame.pickedCards[0].getAttribute("data-card-name"),
          memoryGame.pickedCards[1].getAttribute("data-card-name")
        );

        if (check) {
          const finish = memoryGame.checkIfFinished();
          pairsGuessed.innerHTML = memoryGame.pairsGuessed;

          if (finish) {
            setTimeout(() => {
              window.alert("You won!");
              memoryGame.cardssClicked = 0;
              memoryGame.pairsGuessed = 0;
              cardsClicked.innerHTML = memoryGame.cardsClicked;
              pairsGuessed.innerHTML = memoryGame.pairsGuessed;

              document.querySelectorAll(".card").forEach((card) => {
                card.classList.remove("turned");
              });

              isProcessing = false;
            }, 1000);
          } else {
            memoryGame.pickedCards = [];
            isProcessing = false;
          }
        } else {
          setTimeout(() => {
            memoryGame.pickedCards.forEach((pickedCard) => {
              pickedCard.classList.remove("turned");
            });

            memoryGame.pickedCards = [];
            isProcessing = false;
          }, 1000);
        }
      }
    });
  });
});