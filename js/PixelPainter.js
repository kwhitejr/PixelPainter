$(init);

var pixelPainterContainer = $('#pixelPainter'); // $ = document.getElementById

function init() {
  var swatches = ['red', 'blue', 'green', 'cornflowerblue'];
  var grid = [];
  drawSwatches(swatches);
  drawGrid(2, 2);
}

function drawSwatches(swatches) {
  var swatch = swatches[0];
  var swatchElement = $('<div class="swatch"></div>');
  swatchElement.css('background-color', swatch);

  // Create click handler for this swatch
  swatchElement.on('click', function(event) {
    var targetColor = swatchElement.css('background-color');
    $('.cell').css('background-color', targetColor);
  });

  // Append swatch to pixel painter container
  pixelPainterContainer.append(swatchElement);
}


function drawGrid(x, y) {
  // create grid and grid container
  var grid = [];
  var gridContainer = $('<div />');
  gridContainer.attr('id', 'grid');
  gridContainer.addClass('container');
  for (var column = 0; column < y; column++) {
    // create row and row container
    var rowArray = [];
    var rowContainer = $('<div />');
    for (var row = 0; row < x; row++) {
      //
      var cellElement = $('<div />');
      cellElement.addClass('cell');
      rowArray.push(null);
      rowContainer.append(cellElement);
    }
    grid.push(rowArray);
    gridContainer.append(rowContainer);
  }
  pixelPainterContainer.append(gridContainer);
}