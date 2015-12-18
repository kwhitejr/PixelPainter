$(init);

function init() {
  drawSwatches(3, 3);
  buttonCreator();
  drawCanvas(10, 10);
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

function buttonCreator() {
  var eraseAllButton = $('<button />');
  eraseAllButton.attr('type','button');
  eraseAllButton.attr('class','button');
  eraseAllButton.attr('id','eraseall');
  eraseAllButton.text('Erase All');
  eraseAllButton.on('click', eraseAll);

  // $('#eraseall').on('click', eraseAll);
  var eraseCellButton = '<button type="button" class="button" id="erasecell">Erase</button>';
  $('#erasecell').click(erase);
  var undoButton = '<button type="button" class="button" id="undo">undo</button>';
  $('#undo').click(undo);
  var redoButton = '<button type="button" class="button" id="redo">redo</button>';
  $('#redo').click(redo);
  var saveButton = '<button type="button" class="button" id="save">Save</button>';
  $('#save').click(save);

  pixelPainterContainer.append(eraseAllButton, eraseCellButton, undoButton, redoButton, saveButton);
}

function eraseAll() {
  console.log('Wow, you erased all the things!');
  $('.cell').css('background-color', 'white');
}

function erase() {
  console.log('Wow, you erased it!');
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