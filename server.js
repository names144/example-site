/***
*
* Node server
*
***/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.route('/*').get(function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.route('/validate').post(function(req, res) {
  var url = req.body.url;
  var keywords = ["team", "partners", "management", "people"];
  var toReturn = {
    status: 0,
  };

  http.get(url, function(respnose) {
    console.log("Got response: " + res.statusCode);
    if (respnose.statusCode === 200) {
      toReturn.status = 200;
    } else if (respnose.statusCode >= 400 && respnose.statusCode < 500) {
      toReturn.status = 400;
    } else {
      toReturn.status = respnose.statusCode;
    }
    return res.json(toReturn);
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
    return res.json(e);
  });    
});

var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});