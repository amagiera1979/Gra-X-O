const cell = document.querySelectorAll('.cell');
const player = document.querySelector('.player');
const p = document.querySelector('#p');
const reset = document.querySelector('.reset');
let stampCellX = [];
let stampCellO = [];
let winner = false;

function changePlayer() {
  // w przypadku wygranej nie zmieniaj pola player
  if (winner === true) {
    return;
  } else if (player.innerHTML === 'X') {
    player.innerHTML = 'O';
  } else if (player.innerHTML === 'O') {
    player.innerHTML = 'X';
  }
}

function checkoutWinner(stamp) {
  // ustawienie sekwencji wygranych
  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // sprawdzenie czy przesłana tablica zawiera odpowiednią sekwencję
  win.forEach(e => {
    const aIn = stamp.includes(e[0], 0);
    const bIn = stamp.includes(e[1], 0);
    const cIn = stamp.includes(e[2], 0);
    // w przypadku wygranej
    if (aIn && bIn && cIn) {
      p.innerText = 'Wygrywa gracz: ';
      winner = true;
    }
  });
}

// Wstawianie znaków w pola, sprawdzanie czy są puste
cell.forEach((c, index) => {
  c.addEventListener('click', e => {
    // w przypadku wygranej nie zaznaczaj więcej pol
    if (winner === true && c.innerHTML === '') {
      c.innerHTML = '';
    } else if (c.innerHTML === '' && player.innerHTML === 'X') {
      c.innerHTML = 'X';
      // ustawianie wyniku w odpowiedniej tablicy i sprawdzenie wygranej po 3 ruchach tego samego gracza
      stampCellX.push(index);
      stampCellX.length >= 3 && checkoutWinner(stampCellX);

      changePlayer();
    } else if (c.innerHTML === '' && player.innerHTML === 'O') {
      c.innerHTML = 'O';
      stampCellO.push(index);

      stampCellO.length >= 3 && checkoutWinner(stampCellO);

      changePlayer();
    } else {
      alert('Zaznaczaj tylko puste pola');
    }
  });
});

// czyszczenie tablicy
function clearBoard() {
  cell.forEach(el => {
    el.innerHTML = '';
  });
}
// restart gry
function resetGame() {
  winner = false;
  clearBoard();
  stampCellO = [];
  stampCellX = [];
  changePlayer();
}

reset.addEventListener('click', resetGame);

const showPlayer = e => {
  player.textContent = 'X';
};

window.addEventListener('load', showPlayer);
