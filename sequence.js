const suits = ['S', 'D', 'C', 'H'];
let coinCount = 10;
const values = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];
const shuffleBtn = document.querySelector('.shuffleBtn');
const dealBtn = document.querySelector('.dealBtn');
const myHand = document.querySelector('.myHand');
const clearGameBtn = document.querySelector('.clearGameBtn');
const pickUpBtn = document.querySelector('.pickUpBtn');
const buyBtn = document.querySelector('.buyBtn');
const coinCountSring = document.getElementById('coinCount');
const setArea = document.querySelector('.setsArea');
// I think we need const userHand = [] to be created in a function based on the number of players we have. We also need each user to have an area where they can place cards
// An array or class for each play surface area
// Also probably need winning combo arrays
// Functionality to select multiple cards and put them down
// Ability to reorder cards in hand
// Maybe on click have the cards stick up as they do on hover, or hover + have a border, then keep clicking until you have a set which you may drag over if they match up with a combo in winning combinations

let deck1 = getDeck();
renderDeck(deck1);

shuffleBtn.addEventListener('click', function () {
  shuffle(deck1);
  renderDeck(deck1);
});

dealBtn.addEventListener('click', function () {
  dealHand(deck1, 10);
});

clearGameBtn.addEventListener('click', function () {
  clearHand(myHand);
  clearHand(setArea);
});

pickUpBtn.addEventListener('click', function () {
  dealHand(deck1, 1);
});

buyBtn.addEventListener('click', () => {
  if (coinCount > 0) {
    dealHand(deck1, 2);
    coinCount -= 1;
    coinCountSring.textContent = `My Coins: ${coinCount.toString()}`;
    console.log(coinCount);
  }
});

coinCountSring.textContent = `My Coins: ${coinCount.toString()}`;

function getDeck() {
  let deck = new Array();

  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      let card = {
        Value: values[x],
        Suit: suits[i],
        Source: `./images/${values[x]}${suits[i]}.png`,
      };
      deck.push(card);
    }
  }
  deck.push({ Value: 'Joker', Suit: 'Black', Source: './images/joker.png' });
  deck.push({ Value: 'Joker', Suit: 'Red', Source: './images/joker.png' });

  return deck;
}

function shuffle(deck) {
  // for 1000 turns
  // switch the values of two random cards
  for (let i = 0; i < 1000; i++) {
    let location1 = Math.floor(Math.random() * deck.length);
    let location2 = Math.floor(Math.random() * deck.length);
    let tmp = deck[location1];

    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
}

function renderDeck(deck) {
  document.getElementById('deck').innerHTML = '';

  for (let i = 0; i < deck.length; i++) {
    let card = document.createElement('div');

    let image = document.createElement('img');
    image.addEventListener('mouseover', (e) => {
      e.target.style.marginTop = '0';
    });
    image.addEventListener('mouseleave', (e) => {
      e.target.style.marginTop = '5rem';
    });

    image.classList.add(`${deck[i].Value}${deck[i].Suit}`);
    image.width = '157';
    image.height = '240';
    image.src = deck[i].Source;
    image.draggable = 'true';

    card.appendChild(image);

    document.getElementById('deck').appendChild(card);
  }
}

function dealHand(deck, cardNumber) {
  let hand = [];
  // if (myHand.childElementCount === 0) {
  for (let i = 0; i < cardNumber; i++) {
    let random = deck[Math.floor(Math.random() * deck.length)];
    hand.push(random);
    let image = document.createElement('img');
    // let card = document.createElement('div');
    image.classList.add(`${hand[i].Value}${hand[i].Suit}`);
    image.classList.add('inHand');
    image.width = '157';
    image.height = '240';
    image.src = hand[i].Source;
    image.addEventListener('mouseover', (e) => {
      e.target.style.marginTop = '-50px';
    });
    image.addEventListener('mouseleave', (e) => {
      e.target.style.marginTop = '0';
    });
    // image.addEventListener('click', (e) => {
    //   myHand.removeChild(e.target);
    // });
    image.addEventListener('click', (e) => {
      let card = e.target;
      myHand.removeChild(card);
      setArea.appendChild(card);
    });

    // card.appendChild(image);
    myHand.appendChild(image);
    // }
  }
}

function clearHand(hand) {
  while (hand.hasChildNodes()) {
    hand.removeChild(hand.childNodes[0]);
  }
}
