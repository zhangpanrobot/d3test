var express = require('express');
var request = require('request');
var app = express();

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendfile('public/index.html');
});

app.get('/getdata', function(req, res) {
	request(req.query.url, function(err, response, body){
		if(!err && response.statusCode == 200){
			res.send(body);
		}
	})
});

app.listen(3001);