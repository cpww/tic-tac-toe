// 1st try to win
// 2nd prevent loss
// 3rd go corners
// Else take whatever and it should be a cats game. Meow.

// Player obj
// Board obj
// Comp obj

// Bool on vector and X or O


/*/////////////////////////////////////
// Vector Prototype & Constructor
/////////////////////////////////////*/
function Vector(x, y) {
    this.x = x;
    this.y = y;
    this.value = null;
    console.log('Vector Created!');
};

Vector.prototype.set = function(val) {
    this.value = val;
    console.log('Vector set to: ' + val);
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
    console.log('Grid Created!');
};

Grid.prototype.display = function() {
    var self = this;
    return this.vectors.reduce( function(dispSoFar, vector, index) {
      var curVal = vector.value;
      if (curVal === null) {
        curVal = ' ';
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
    console.log('Setting Vector: ' + index + ' to: ' + value);
    this.vectors[index].set(value);
}

// Grid.prototype.getSurroundingVectors = function(index) {
//     var self = this;    
//     var translations = [[-1, -1], [0, -1], [1, -1],
//                         [-1,  0],          [1,  0],
//                         [-1,  1], [0,  1], [1,  1]];
//     var vector = self.vectors[index];
//     return translations.map(function(translation) {
//         console.log('translation: ' + translation + ', vector.x: ' + vector.x);
//         return self.vectors[vector.x + translation[0] + (vector.y + translation[1]) * self.width];
//     }).filter(function(element) {
//       return element;
//     });
// }
  
Grid.prototype.checkForWin = function() {
    //var surroundingVectors = this.getSurroundingVectors(index);

    var winCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    
    // Helper function that acts on a single win combo, returning "win" true or false
    var containsWin = function(currentWinCombo) {
        return currentWinCombo.reduce(function(w,el,i,arr){
            return w && (arr.length-1 == i || (self.vectors[el].value != null && self.vectors[el].value == self.vectors[arr[i+1]].value));
      }, true)
    }
    
    // Assign this to self in order to access Grid instance from within callbacks
    var self = this;
    return winCombos.reduce(function(previousValue, currentWinCombo) {
      return previousValue || containsWin(currentWinCombo);
    }, false)
}


function Game() {
  this.grid = new Grid();
}

Game.prototype.play = function() {
  while (!this.grid.checkForWin()) {
    // check availiablity
    // make move
    while (!this.validMove()) {}
  } 
}
 



/*/////////////////////////////////////
// Sanity Code
/////////////////////////////////////*/
grid = new Grid();
//game
  //index = entity.move(grid)
  //grid.setVector(index, entity.mark)
  //grid.checkForWin(index, entity.mark)
console.log(grid.display());
console.log(grid.checkForWin());
grid.setVector(3, 'X');
grid.setVector(0, 'O');
grid.setVector(1, 'O');
grid.setVector(2, 'O');
grid.setVector(8, 'X');
grid.setVector(6, 'O');
console.log(grid.display());
// console.log(grid.getSurroundingVectors(1));
console.log(grid.checkForWin());
