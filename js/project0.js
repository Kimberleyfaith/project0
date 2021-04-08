// console.log(jQuery().jquery); // to check jQuery version

const reset_board = function () {

  $('#0').text('');
  $('#1').text('');
  $('#2').text('');
  $('#3').text('');
  $('#4').text('');
  $('#5').text('');
  $('#6').text('');
  $('#7').text('');
  $('#8').text('');
  addInvisible($('#winner'));
};

const secondPlayerName = "";

const changePlayer = function (player) {

  if (player === playerOne.token) {
    return playerTwo.token;
  } else if (player === playerTwo.token) {
    return playerOne.token;
  }
};

let player;
let playerOne = {
  name: '',
  token: ''
};

let playerTwo = {
 name: '',
 token: ''
};

const name1 = $('#player1').focusout(function(event) {
  console.log(event.currentTarget.value);
  playerOne.name = event.currentTarget.value;
  console.log(playerOne);
});

const name2 = $('#player2').focusout(function(event) {
  console.log(event.currentTarget.value);
  playerTwo.name = event.currentTarget.value;
  console.log(playerTwo);
});

$('#button1').on('click', function() {
  playerOne.token = 'X';
  playerTwo.token = 'O';
})

$('#button2').on('click', function() {
  playerOne.token = 'O';
  playerTwo.token = 'X';
})


const assign_player = function (token) {
  player = token;
  addInvisible($('.assign_token'));
};

const addInvisible = function (element) {
  element.addClass('invisible');
};

const removeInvisible = function (element) {
  element.removeClass('invisible');
};

// assign_player('X'); // player = 'X'

for (let i = 0; i <= 8; i++) {

  $(`#${i}`).on('click', function() {
    console.log('player', player);

    let winner = checkWinner();

    if (winner != playerOne.token && winner != playerTwo.token) {
      if ($(`#${i}`).text() === "") {
        if (player === playerOne.token) {
          $(`#${i}`).text(playerOne.token);
        } else if (player === playerTwo.token) {
          $(`#${i}`).text(playerTwo.token);
        }
        // check the winner before changing current player
        winner = checkWinner();
        console.log('winner:', winner);

        if (winner === 'tie') {
          removeInvisible($('#winner').text(`It is a tie`));
        } else if (winner === playerOne.token || winner === playerTwo.token) {
          if (winner === playerOne.token) {
            removeInvisible($('#winner').text(`The winner is: ${playerOne.name}`));
          } else if (winner === playerTwo.token) {
            removeInvisible($('#winner').text(`The winner is: ${playerTwo.name}`));
        };
        }
        // players take turns
        player = changePlayer(player);
      }
    }
})};

// 0 1 2
// 3 4 5
// 6 7 8

const checkWinner = function () {
  const box0 = $('#0').text();
  const box1 = $('#1').text();
  const box2 = $('#2').text();
  const box3 = $('#3').text();
  const box4 = $('#4').text();
  const box5 = $('#5').text();
  const box6 = $('#6').text();
  const box7 = $('#7').text();
  const box8 = $('#8').text();

  if (box0 === box1 && box1 === box2 && box0 != "") {
    $('#0, #1, #2').addClass("winning_combination");
    return box0;
  } else if (box3 === box4 && box4 === box5 && box3 != "") {
      return box3;
  } else if (box6 === box7 && box7 === box8 && box6 != "") {
      return box6;
  } else if (box0 === box3 && box3 === box6 && box0 != "") {
      return box0;
  } else if (box1 === box4 && box4 === box7 && box1 != "") {
      return box1;
  } else if (box2 === box5 && box5 === box8 && box2 != "") {
      return box2;
  } else if (box0 === box4 && box4 === box8 && box0 != "") {
      return box0;
  } else if (box2 === box4 && box4 === box6 && box2 != "") {
      return box2;
  } else if (box0 != "" && box1 != "" && box2 != "" && box3 != "" && box4 != "" && box5 != "" && box6 != "" && box7 != "" && box8 != "") {
    return 'tie';
  }

};


// if event.target have a value set it


// 1. userChoice
// 2. computerChoice
// 8. Get the computer to think strategically
//
// Website Examples:
// https://codepen.io/marxcom/pen/LWQXRX
// https://codepen.io/MutantSpore/pen/jWWYLo
