var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pixelpainter');

var paintingSchema = mongoose.Schema({
  author: String,
  painting: []
});

var Painting = mongoose.model('Painting', paintingSchema);

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.render('index');
});

app.post('/save', function (req, res) {
  var newPainting = new Painting({
    author: "Kevin",
    painting: req.body.painting
  });
  newPainting.save(function (err, painting) {
    console.log(painting);
    res.send('great painting');
  });
  // res.send('Great painting!');
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  var server = app.listen(3000, function() {
    console.log('Listening to port', server.address().port);
  });
});