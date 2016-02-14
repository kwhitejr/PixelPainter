$(init);

function init() {
  drawSwatches(3, 3);
  drawCanvas(10, 10);
  buttonCreator();
  // mouseChecker();
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
// UNDER CONSTRUCTION
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
  // tracks the index of the swatches array
  var i = 0;
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

function buttonCreator() {
  var $eraseAllButton = $('<button />'); // must be a JQuery object in order to use JQuery functions, derp
  $eraseAllButton.attr('type','button');
  $eraseAllButton.attr('class','button');
  $eraseAllButton.attr('id','eraseall');
  $eraseAllButton.text('Erase All');
  $eraseAllButton.on('click', eraseAll);

  var $eraseCellButton = $('<button />');
  $eraseCellButton.attr('type','button');
  $eraseCellButton.attr('class','button');
  $eraseCellButton.attr('id','erasecell');
  $eraseCellButton.text('Erase');
  $eraseCellButton.on('click', erase);

  var $undoButton = $('<button />');
  $undoButton.attr('type','button');
  $undoButton.attr('class','button');
  $undoButton.attr('id','undo');
  $undoButton.text('Undo');
  $undoButton.on('click', undo);


  var $redoButton = $('<button />');
  $redoButton.attr('type','button');
  $redoButton.attr('class','button');
  $redoButton.attr('id','redo');
  $redoButton.text('Redo');
  $redoButton.on('click', redo);

  var $saveButton = $('<button />');
  $saveButton.attr('type','button');
  $saveButton.attr('class','button');
  $saveButton.attr('id','save');
  $saveButton.text('Save');
  $saveButton.on('click', save);

  var $feelingLucky = $('<button />');
  $feelingLucky.attr('type','button');
  $feelingLucky.attr('class','button');
  $feelingLucky.attr('id','lucky');
  $feelingLucky.text('I\'m feeling lucky!');
  $feelingLucky.on('click', feelingLucky);

  // Append all buttons to the container.
  pixelPainterContainer.append($eraseAllButton, $eraseCellButton, $undoButton, $redoButton, $saveButton, $feelingLucky);
}

function eraseAll() {
  // Converts background color of all canvas cells to white.
  console.log('Wow, you erased all the things!');
  $('.canvasCell').css('background-color', 'white');
}

function erase() {
  $('#selected').removeAttr('id');
  selectedColor = 'white';
  $(this).attr('id', 'selected');
  console.log(selectedColor);
}

function undo() {
  console.log('Wow, you undid!');
}

function redo() {
  console.log('Wow, you redid!');
}

function save() {
  console.log('Wow, you saved!');
}

function feelingLucky() {
  console.log('Feeling lucky, punk?');
}

// highlights the currently selected color
function selectColor() {
  // Remove 'selected' status from a different swatch.
  $('#selected').removeAttr('id');
  // Set variable to color of selected (clicked) swatch.
  selectedColor = $(this).css('background-color');
  // Add 'selected' status to selected swatch.
  $(this).attr('id', 'selected');
  console.log('You selected ' + selectedColor);
}

// draw function for a single click
function clickDraw() {
  // Changes selected canvas cell background-color to value stored at 'selectedColor'
  $(this).css('background-color', selectedColor);
  console.log('drawing');
}

// draw function for a click-and-drag
// UNDER CONSTRUCTION
function dragDraw() {
  if (mouseState) {
    $(this).css('background-color', selectedColor);
    console.log('drawing');
  }
}

// create the canvas grid
function drawCanvas(x, y) {
  // create grid and grid container
  var canvasContainer = $('<div />');
  var i = 1;
  canvasContainer.attr('id', 'canvas');
  canvasContainer.addClass('container');
  for (var column = 0; column < y; column++) {
    // create row and row container
    var rowContainer = $('<div />');
    for (var row = 0; row < x; row++) {
      // create cell elements and add 'cell' class
      var cellElement = $('<div />');
      cellElement.addClass('canvasCell');
      cellElement.attr('id', i); // adds a unique ID to each canvas cell
      cellElement.on('click', clickDraw);
      cellElement.on('mouseover', dragDraw);
      i++;
      rowContainer.append(cellElement);
    }
    canvasContainer.append(rowContainer);
  }
  pixelPainterContainer.append(canvasContainer);
}