// 1st try to win
// 2nd prevent loss
// 3rd go corners
// Else take whatever and it should be a cats game. Meow.

// Player obj
// Board obj
// Comp obj

// Bool on vector and X or O

var vectorPrototype = {
  value: null,
  set: function(val) {
    this.value = val;
  }
};

function Vector() {};

Vector.prototype = vectorPrototype;

v1 = new Vector();
v1.set('X');

console.log(v1.value);



var gridPrototype = {
  vectors: [new Vector(), new Vector(), new Vector(),
            new Vector(), new Vector(), new Vector(),
            new Vector(), new Vector(), new Vector()],
  display: function() {
    return this.vectors.reduce( function(dispSoFar, vector, index) {
      var curVal = vector.value;
      if (curVal === null) {
        curVal = ' ';
      }
      if ((index + 1) % 3) {
        curVal = ' ' + curVal + ' |';
      }
      else {
        curVal = ' ' + curVal + '\n';
      }
      if ((index + 1) / 3 === 1 || (index + 1) / 6 === 1) {
        curVal += '-----------\n';
      }

      return dispSoFar + curVal;
    }, '')
  },
  setVector: function(index, value) {
    this.vectors[index].set(value);
  },
  checkForWin: function(index, value) {
    var setValue = value;
  }
};

//game
  //index = entity.move(grid)
  //grid.setVector(index, entity.mark)
  //grid.checkForWin(index, entity.mark)

function Grid() {};
Grid.prototype = gridPrototype;

grid = new Grid();
grid.vectors.forEach(function(vector) {
  console.log(vector.value);
});
console.log(grid.display());
grid.setVector(3, 'X');
grid.setVector(0, 'O');
grid.setVector(8, 'X');
grid.setVector(6, 'O');
console.log(grid.display());