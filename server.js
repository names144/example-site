/***
*
* Node server
*
***/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.route('/*').get(function(req, res) {
  res.sendfile('public/index.html');
});

app.route('/validate').post(function(req, res) {
  console.log(req.body);
});

var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);

});