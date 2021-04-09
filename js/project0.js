let player;
const playerOne = {
  name: '',
  token: '',
  gamesWon: 0
};
const playerTwo = {
  name: '',
  token: '',
  gamesWon: 0
};

// First 3 functions are helper functions

// Create a function, to change element text
const changeText = function (elementRef, message) {
  return $(elementRef).text(message);
};

// Adds invisible class
const addInvisible = function(element) {
  element.addClass('invisible');
};

// Removes invisible class
const removeInvisible = function(element) {
  element.removeClass('invisible');
};

// Validates player 1 and player 2 fields to ensure a value is entered - Makes these fields required.
const validate = function(player) {
  const fieldValue = $(`#${player}`).val();
  if (!fieldValue) {
    $(`#${player}-validation`).removeClass('hidden');
  } else {
    $(`#${player}-validation`).addClass('hidden');
  }
};

// Resetting the game board to start again
const reset_board = function() {
  $('#0').text('');
  $('#1').text('');
  $('#2').text('');
  $('#3').text('');
  $('#4').text('');
  $('#5').text('');
  $('#6').text('');
  $('#7').text('');
  $('#8').text('');
  addInvisible($('#winner')); //Hide the winner h2 element
  removeInvisible($('#player-turn')); // Show player turn for next round
  $('.winning-combination').removeClass('winning-combination'); // Remove winning animation.
};

const changePlayer = function(player) {
  if (player === playerOne.token) {
    changeText('#player-turn', `${playerTwo.name} it is your turn`);
    return playerTwo.token;
  } else if (player === playerTwo.token) {
    changeText('#player-turn', `${playerOne.name} it is your turn`);
    return playerOne.token;
  }
};

// Focus is removed from field - name is retrieved from what user has entered for player one
$('#player1').focusout(function(event) {
  playerOne.name = event.currentTarget.value;
  $('.name1').text(playerOne.name);
  // if user has entered a value (field is not empty) Show player name select token selection
  if (playerOne.name) {
    changeText('#choose-token', `${playerOne.name}: Select your token`);
    removeInvisible($('.assign_token'));
  }
});

// Focus is removed from field - name is retrieved from what user has entered for player two
$('#player2').focusout(function(event) {
  playerTwo.name = event.currentTarget.value;
  $('.name2').text(playerTwo.name);
});

// X button is clicked set playerOne token to X and set playerTwo tokent to O
$('#button1').on('click', function() {
  playerOne.token = 'X';
  playerTwo.token = 'O';
});

// O button is clicked set playerOne token tp O and set playerTwo token to X
$('#button2').on('click', function() {
  playerOne.token = 'O';
  playerTwo.token = 'X';
});


const assign_player = function(token) {
  if (playerOne.name && playerTwo.name) {
    // Sets token for playerOne (first player)
    player = token;
    // Hides assign token div
    addInvisible($('.assign_token'));
    // Sets text to include player ones name
    changeText('#player-turn', `${playerOne.name}: It is your turn`);
    // Shows players turn text
    removeInvisible($('#player-turn'));
  }
};

// Works out winning combinations
const checkWinner = function() {
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
    $('#0, #1, #2').addClass("winning-combination");
    return box0;
  } else if (box3 === box4 && box4 === box5 && box3 != "") {
    $('#3, #4, #5').addClass("winning-combination");
    return box3;
  } else if (box6 === box7 && box7 === box8 && box6 != "") {
    $('#6, #7, #8').addClass("winning-combination");
    return box6;
  } else if (box0 === box3 && box3 === box6 && box0 != "") {
    $('#0, #3, #6').addClass("winning-combination");
    return box0;
  } else if (box1 === box4 && box4 === box7 && box1 != "") {
    $('#1, #4, #7').addClass("winning-combination");
    return box1;
  } else if (box2 === box5 && box5 === box8 && box2 != "") {
    $('#5, #8, #2').addClass("winning-combination");
    return box2;
  } else if (box0 === box4 && box4 === box8 && box0 != "") {
    $('#0, #4, #8').addClass("winning-combination");
    return box0;
  } else if (box2 === box4 && box4 === box6 && box2 != "") {
    $('#2, #4, #6').addClass("winning-combination");
    return box2;
  } else if (box0 != "" && box1 != "" && box2 != "" && box3 != "" && box4 != "" && box5 != "" && box6 != "" && box7 != "" && box8 != "") {
    return 'tie';
  }
};

// Handles adding X's and O's to the board and handles winner responses
for (let i = 0; i <= 8; i++) {

  $(`#${i}`).on('click', function() {
    // Alerts if player names have not been entered or token has not been picked before someone has tried clicking on the board
    if (!player || !playerOne.name || !playerTwo.name) {
      return window.alert("Please enter your name and select a token before playing.");
      removeInvisible($('.assign_token'));
    }
    let winner = checkWinner();

    // If there there is no winner and block has no token allow token to be added
    if (winner != playerOne.token && winner != playerTwo.token) {
      if ($(`#${i}`).text() === "") {
        if (player === playerOne.token) {
          $(`#${i}`).text(playerOne.token);
        } else if (player === playerTwo.token) {
          $(`#${i}`).text(playerTwo.token);
        }
        // check the winner before changing current player
        winner = checkWinner();

        // Handles response if game is tied
        if (winner === 'tie') {
          changeText('#winner', `It is a tie`);
          removeInvisible($('#winner'));
          addInvisible($('#player-turn')); removeInvisible($('.reset_button'));
        } else if (winner === playerOne.token || winner === playerTwo.token) {
          // Hanldes response if game is won by player one
          if (winner === playerOne.token) {
            changeText('#winner', `The winner is: ${playerOne.name}`);
            playerOne.gamesWon = playerOne.gamesWon + 1;
            changeText('#playerscore1', `${playerOne.gamesWon}`);
            removeInvisible($('#winner'));
          } else if (winner === playerTwo.token) {
            // Handles response if game is won by player two
            const message = changeText('#winner', `The winner is: ${playerTwo.name}`);
            playerTwo.gamesWon = playerTwo.gamesWon + 1;
            changeText('#playerscore2', `${playerTwo.gamesWon}`);
            removeInvisible($('#winner'));
          };
          addInvisible($('#player-turn'));
          removeInvisible($('.reset_button'));
        };
        // players take turns
        player = changePlayer(player);
      };
    };
  });
};

// If trying to play without entering a name - let user know √
// Let current player know it is their turns √
// Only show reset button after winner declared √
// Add a comment for player one to choose token √
