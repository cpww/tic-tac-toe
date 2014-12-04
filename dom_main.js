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

Grid.prototype.setVector = function(index, value) {
  //console.log('Setting Vector: ' + index + ' to: ' + value);
  this.vectors[index-1].set(value);
  document.getElementById(index).textContent = value;
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

/*/////////////////////////////////////
// Game Prototype & Constructor
/////////////////////////////////////*/
function Game() {
  this.grid = new Grid();
  this.turn = 0
  this.players = [new Player('human', 'X'), new Player('human', 'O')]
  this.playersIndex = Math.floor(Math.random()*2)
  this.currentPlayer = this.players[this.playersIndex]
}

Game.prototype.catsGame = function() {
  return this.turn == 9;
}

Game.prototype.updateCurrentPlayer = function() {
  if (this.playersIndex == 0) {
    this.playersIndex = 1;
  }
  else {
    this.playersIndex = 0;
  }
  this.currentPlayer = this.players[this.playersIndex];
  this.updateh1()
}

Game.prototype.updateh1 = function() {
  console.log('in updateh1');
  document.getElementById('turn').textContent = "It is " + this.currentPlayer.value + "'s turn!";
}

game = new Game();
//game.play();

function vectorClicked(id) {
  game.turn += 1;
  game.grid.setVector(id, game.currentPlayer.value);
  if (!game.grid.hasWin() && !game.catsGame()) {
    //if (false) { //otherplayeriscomputer) {
      //then computer move
    //}
    //else {
    game.updateCurrentPlayer()
  }
  else {
    if (!game.catsGame()) {
      document.getElementById('turn').textContent = game.currentPlayer.value + ' WINS!!!';
    }
    else {
      document.getElementById('turn').textContent = 'CATS GAME!!!';
    }
    var nodeList = document.getElementsByTagName('button');
    for (var i = 0; i < nodeList.length; ++i) {
      nodeList[i].removeAttribute('onclick');
    }
  }
}

document.onload = game.updateh1();
