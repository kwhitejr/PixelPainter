function drawGrid (rows, cols) {
  this.rows = rows;
  this.cols = cols;

  var grid = $('table');
  grid.attr('id', 'grid');

  for (var i=0; i < rows; i++) {
    row = $('tr');
    for (var j=0; j < cols; j++) {
      col = $('td');
      col.addClass('swatch');
      col.css(swatches[])
    }
  }
  grid.appendChild(row);
}