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
var vectorPrototype = {
  value: null,
  set: function(val) {
    this.value = val;
    console.log('Vector set to: ' + val);
  }
};

function Vector(x, y) {
    this.x = x;
    this.y = y;
    console.log('Vector Created!');
};

Vector.prototype = vectorPrototype;


/*/////////////////////////////////////
// Grid Prototype & Constructor
/////////////////////////////////////*/
var gridPrototype = {
  width: 3,
  height: 3,
  vectors: [new Vector(0, 0), new Vector(1, 0), new Vector(2, 0),
            new Vector(0, 1), new Vector(1, 1), new Vector(2, 1),
            new Vector(0, 2), new Vector(1, 2), new Vector(2, 2)],
  display: function() {
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
  },
  setVector: function(index, value) {
    console.log('Setting Vector: ' + index + ' to: ' + value);
    this.vectors[index].set(value);
  },
  getSurroundingVectors: function(index) {
    var self = this;
    var translations = [[-1, -1], [0, -1], [1, -1],
                        [-1,  0],          [1,  0],
                        [-1,  1], [0,  1], [1,  1]];
    var vector = this.vectors[index];
    return translations.map(function(translation) {
        return new Vector(vector.x + translation[0], vector.y + translation[1]);
    })
  },
  checkForWin: function(index, value) {
    var surroundingVectors = this.getSurroundingVectors(index);
  }
};

function Grid() {
    console.log('Grid Created!');
};
Grid.prototype = gridPrototype;


/*/////////////////////////////////////
// Sanity Code
/////////////////////////////////////*/
grid = new Grid();
//game
  //index = entity.move(grid)
  //grid.setVector(index, entity.mark)
  //grid.checkForWin(index, entity.mark)
console.log(grid.display());
grid.setVector(3, 'X');
grid.setVector(0, 'O');
grid.setVector(8, 'X');
grid.setVector(6, 'O');
console.log(grid.display());
console.log(grid.getSurroundingVectors(1));
