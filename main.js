// 1st try to win
// 2nd prevent loss
// 3rd go corners
// Else take whatever and it should be a cats game. Meow.

// Player obj
// Board obj
// Comp obj

// Bool on vector and X or O


///////////////////////////////////////
// Vector Prototype & Constructor
///////////////////////////////////////
var vectorPrototype = {
  value: null,
  set: function(val) {
    this.value = val;
    console.log('Vector set to: ' + val);
  }
};

function Vector() {
    console.log('Vector Created!');
};

Vector.prototype = vectorPrototype;


///////////////////////////////////////
// Grid Prototype & Constructor
///////////////////////////////////////
var gridPrototype = {
  width: 3,
  vectors: [new Vector(), new Vector(), new Vector(),
            new Vector(), new Vector(), new Vector(),
            new Vector(), new Vector(), new Vector()],
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
  checkForWin: function(index, value) {
    var setValue = value;
  }
};

function Grid() {
    console.log('Grid Created!');
};
Grid.prototype = gridPrototype;


///////////////////////////////////////
// Sanity Code
///////////////////////////////////////
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
