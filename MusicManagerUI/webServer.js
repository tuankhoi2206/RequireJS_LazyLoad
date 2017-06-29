var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/app'));
app.use(bodyParser.json());

app.get('', function(req, res){
	console.log('send file index');
	res.sendFile('indexSongTest.html');
});

app.listen(3000);
console.log('Server listening on port 3000');