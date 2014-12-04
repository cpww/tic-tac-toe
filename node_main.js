/*/////////////////////////////////////
// Vector Prototype & Constructor
/////////////////////////////////////*/
function Vector(x, y) {
    this.x = x;
    this.y = y;
    this.value = null;
    //console.log('Vector Created!');
};

Vector.prototype.set = function(val) {
    this.value = val;
    //console.log('Vector set to: ' + val);
}

/*/////////////////////////////////////
// Grid Prototype & Constructor
/////////////////////////////////////*/
function Grid() {
    this.width = 3;
    this.height = 3;
    this.vectors = [new Vector(0, 0), new Vector(1, 0), new Vector(2, 0),
                    new Vector(0, 1), new Vector(1, 1), new Vector(2, 1),
                    new Vector(0, 2), new Vector(1, 2), new Vector(2, 2)];
    this.winCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    //console.log('Grid Created!');
};

Grid.prototype.display = function() {
    var self = this;
    return this.vectors.reduce( function(dispSoFar, vector, index) {
      var curVal = vector.value;
      if (curVal === null) {
        curVal = index + 1;
      }
      if ((index + 1) % self.width) {
        curVal = ' ' + curVal + ' |';
      }
      else {
        curVal = ' ' + curVal + '\n';
      }
      if (index + 1 != self.vectors.length  && ((index + 1) % self.width) === 0) {
        curVal += '-----------\n';
      }

      return dispSoFar + curVal;
    }, '')
}

Grid.prototype.setVector = function(index, value) {
    //console.log('Setting Vector: ' + index + ' to: ' + value);
    this.vectors[index].set(value);
}

Grid.prototype.hasWin = function() {
    //var surroundingVectors = this.getSurroundingVectors(index);


    var self = this;

    // Fuck reduce
    return this.winCombos.some(function(element, index, array) {

        var currentCombo = [self.vectors[element[0]].value, self.vectors[element[1]].value, self.vectors[element[2]].value];

        return currentCombo.indexOf(null) === -1 &&
               currentCombo[0] === currentCombo[1] && currentCombo[0] === currentCombo[2];
      })
}

/*/////////////////////////////////////
// Player Prototype & Constructor
/////////////////////////////////////*/
function Player(type, value) {
  this.type = type;
  this.value = value;
}
var prompt = require('sync-prompt').prompt;

function onErr(err) {
  //console.log(err);
  return 1;
}

var count_in_array = function(array, val) {
  return array.filter(function(el) {
    return el === val;
  }).length;
}

Player.prototype.makeMove = function(grid) {
  var invalidMove = true;
  if (this.type == 'human') {
    open_indexes = grid.vectors.filter(function(vector) {
      return vector.value == null;
    }).map(function(vector, i) {
      return grid.vectors.indexOf(vector)+1;
    });
    while (invalidMove) {
      var index = prompt('Enter a number from this list of available spaces ' + open_indexes + ': ') - 1;
      if ([0,1,2,3,4,5,6,7,8].indexOf(index) > -1 && grid.vectors[index].value == null) {
        grid.setVector(index, this.value);
        invalidMove = false;
      }
      else {
        console.log("Please enter a valid number");
      }
    }
  }
  else {
    // computer move code goes here
    var self = this;
    var enemy;
    if (self.value == 'O') {
      enemy = 'X';
    }
    else {
      enemy = 'O';
    }

    // The Vector index we'll set on grid's vectors array
    var index = null;;

    //console.log('computer is attempting to win');
    // First, try to win...
    grid.winCombos.some(function(winCombo) {
      values = [grid.vectors[winCombo[0]].value, grid.vectors[winCombo[1]].value, grid.vectors[winCombo[2]].value]
      if (count_in_array(values, null) == 1 && count_in_array(values, self.value) == 2) {
        index = winCombo[values.indexOf(null)];
        return true;
      }
    });
    //console.log('computer index is now: ' + index);
    if (index == null) {
      //console.log('computer is attempting to block');
      // No win?  Try to block...
      grid.winCombos.some(function(winCombo) {
        values = [grid.vectors[winCombo[0]].value, grid.vectors[winCombo[1]].value, grid.vectors[winCombo[2]].value]
        //console.log('values is: ' + values);
        //console.log('enemy is: ' + enemy);
        //console.log('count_in_array null: ' + count_in_array(values, null));
        //console.log('count_in_array ' + enemy + ' : ' + count_in_array(values, enemy));
        if (count_in_array(values, null) == 1 && count_in_array(values, enemy) == 2 ) {
          index = winCombo[values.indexOf(null)];
          return true;
        }
      });
    }
    //console.log('computer index is now: ' + index);
    if (index == null) {
      // No block?  Try for center...
      //console.log('computer is attempting to center');
      if (grid.vectors[4].value == null) {
        index = 4;
      }
    }
    //console.log('computer index is now: ' + index);
    if (index == null) {
      // No center?  Try a corner...
      //console.log('computer is attempting to corner');
      var corners = [0, 2, 6, 8];
      var open_corners = corners.filter(function(corner) {
          return grid.vectors[corner].value == null;
      });
      if (open_corners.length) {
        index = open_corners[Math.floor(Math.random()*open_corners.length)]
      }
    }
    //console.log('computer index is now: ' + index);
    if (index == null) {
      // Geez, just try wherever...
      //console.log('computer is attempting to wherever');
      var remainers = [1, 3, 4, 5, 7];
      var open_remainers = remainers.filter(function(remainer) {
          return grid.vectors[remainer].value == null;
      });
      if (open_remainers.length) {
        index = open_remainers[Math.floor(Math.random()*open_remainers.length)]
      }
    }
    //console.log('computer index is now: ' + index);
    grid.setVector(index, this.value);
  }
}


/*/////////////////////////////////////
// Game Prototype & Constructor
/////////////////////////////////////*/
function Game() {
  this.grid = new Grid();
  this.turn = 0
  this.currentPlayer = Math.floor(Math.random()*2)
}

Game.prototype.catsGame = function() {
  return this.turn == 9;
}

Game.prototype.getCurrentPlayer = function() {
  if (this.currentPlayer % 2 == 0) {
    this.currentPlayer += 1;
  }
  else {
    this.currentPlayer -= 1;
  }
  return this.players[this.currentPlayer]
}

Game.prototype.setUpPlayers = function() {
  console.log('Choose your player option: 1 for human v human, 2 for human v computer, 3 for computer v computer');
  var invalidMove = true;
  while (invalidMove) {
    var choice = parseInt(prompt('Enter a number: '));
    if ([1,2,3].indexOf(choice) > -1) {
      if (choice == 1) {
        this.players = [new Player('human', 'X'), new Player('human', 'O')]
      }
      else if (choice == 2) {
        this.players = [new Player('human', 'X'), new Player('computer', 'O')]
      }
      else {
        this.players = [new Player('computer', 'X'), new Player('computer', 'O')]
      }
      invalidMove = false;
    }
    else {
      console.log("Please enter a valid number");
    }
  }
}

Game.prototype.play = function() {
  console.log('Welcome to Tic-Tac-Toe!\n' +
    'To move, Enter a number from 1-9 when prompted.');
  this.setUpPlayers();
  console.log(this.grid.display());
  while (!this.grid.hasWin() && !this.catsGame()) {
    this.turn += 1;
    var currentPlayer = this.getCurrentPlayer();
    console.log('It is "' + currentPlayer.value + '"s turn!');
    currentPlayer.makeMove(this.grid)
    console.log(this.grid.display());
  }
  if (this.grid.hasWin()) {
    console.log('Player "' + currentPlayer.value + '" WINS!!!')
  }
  else {
    console.log('Cats Game!');
  }
}




/*/////////////////////////////////////
// Sanity Code
/////////////////////////////////////*/
//grid = new Grid();
////game
//  //index = entity.move(grid)
//  //grid.setVector(index, entity.mark)
//  //grid.hasWin(index, entity.mark)
//console.log(grid.display());
//console.log(grid.hasWin());
//grid.setVector(3, 'X');
//grid.setVector(0, 'O');
//grid.setVector(1, 'O');
//grid.setVector(2, 'O');
//grid.setVector(8, 'X');
//grid.setVector(6, 'O');
//console.log(grid.display());
//console.log('Did we win?', grid.hasWin());

game = new Game();
game.play();

