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

app.use(express.static(__dirname + '/public'));

app.route('/*').get(function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.route('/validate').post(function(req, res) {
  var url = req.body.url;
  var toReturn = {
    status: 0,
  };

  http.get(url, function(response) {
    console.log("Got response: " + response.statusCode);
    if (response.statusCode === 200) {
      toReturn.status = 200;
    } else if (response.statusCode >= 400 && response.statusCode < 500) {
      toReturn.status = 400;
    } else {
      toReturn.status = response.statusCode;
    }
    return res.json(toReturn);
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
    return res.json(e);
  });    
});

var server = app.listen(8080, function () {

  var port = server.address().port;

  console.log('Listening on port %s', port);
});