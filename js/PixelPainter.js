$(init);

function init() {
  drawSwatches(3, 3);
  drawCanvas(10, 10);
  mouseChecker();
}

var pixelPainterContainer = $('#pixelPainter'); // $ = document.getElementById
var swatches = [
  'red',
  'blue',
  'green',
  'cornflowerblue',
  'yellow',
  'pink',
  'orange',
  'darkviolet',
  'indianred'
];
var selectedColor = 'white'; // the background color of the selected swatch. Default is white.
var mouseState = false; // track the state of the mouse. Down => true; Up => false

// a function to persistently track the state of the mouse
function mouseChecker() {
  if ($('body').mousedown()) {
    mouseState = true;
  }
  if ($('body').mouseup()) {
    mouseState = false;
  }
}

// create the swatch grid
function drawSwatches(x, y) {
  var swatchContainer = $('<div />');
  var i = 0; // tracks the index of the swatches array
  swatchContainer.attr('id', 'swatch');
  swatchContainer.addClass('container');
  for (var column = 0; column < y; column++) {
    // create row and row container
    var rowContainer = $('<div />');
    for (var row = 0; row < x; row++) {
      var cellElement = $('<div />');
      cellElement.addClass('swatch');
      cellElement.css('background-color', swatches[i]);
      // Create click handler for this swatch
      cellElement.on('click', selectColor);
      i++;
      rowContainer.append(cellElement);
    }
    swatchContainer.append(rowContainer);
  }
  // Append swatch to pixel painter container
  pixelPainterContainer.append(swatchContainer);
}

// highlights the currently selected color
function selectColor() {
  $('#selected').removeAttr('id');
  selectedColor = $(this).css('background-color');
  $(this).attr('id', 'selected');
  console.log(selectedColor);
}

// draw function for a single click
function clickDraw() {
  $(this).css('background-color', selectedColor);
  console.log('drawing');
}

// draw function for a click-and-drag
function dragDraw() {
  if (mouseState) {
    $(this).css('background-color', selectedColor);
    console.log('drawing');
  }
}

// create the canvas grid
function drawCanvas(x, y) {
  // create grid and grid container
  var gridContainer = $('<div />');
  var i = 1;
  gridContainer.attr('id', 'grid');
  gridContainer.addClass('container');
  for (var column = 0; column < y; column++) {
    // create row and row container
    var rowContainer = $('<div />');
    for (var row = 0; row < x; row++) {
      // create cell elements and add 'cell' class
      var cellElement = $('<div />');
      cellElement.addClass('cell');
      cellElement.attr('id', i); // adds a unique ID to each canvas cell
      cellElement.on('click', clickDraw);
      cellElement.on('mouseover', dragDraw);
      i++;
      rowContainer.append(cellElement);
    }
    gridContainer.append(rowContainer);
  }
  pixelPainterContainer.append(gridContainer);
}