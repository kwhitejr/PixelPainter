//Pixel Painter Mixin
function Grid(x, y) {
  this.x = x;
  this.y = y;

  this.drawGrid = function(gridId, cellClass) {
    var gridContainer = $('<div />');
    gridContainer.attr('id', gridId);
    gridContainer.addClass('container');
    for (var column = 0; column < y; column++) {
      // create row and row container
      var rowContainer = $('<div />');
      for (var row = 0; row < x; row++) {
        var cellElement = $('<div />');
        cellElement.addClass(cellClass);
        rowContainer.append(cellElement);
      }
      gridContainer.append(rowContainer);
    }
  pixelPainterContainer.append(gridContainer);
  };
}

Grid.prototype.color = function() {

};