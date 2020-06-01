const suits = ['S', 'D', 'C', 'H'];
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

let deck1 = getDeck();
renderDeck(deck1);

shuffleBtn.addEventListener('click', function () {
  shuffle(deck1);
  renderDeck(deck1);
});

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
    image.width = '314';
    image.height = '480';
    image.src = deck[i].Source;

    card.appendChild(image);

    document.getElementById('deck').appendChild(card);
  }
}
