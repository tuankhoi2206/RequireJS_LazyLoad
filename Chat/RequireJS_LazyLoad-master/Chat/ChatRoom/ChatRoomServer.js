var express = require('express');
var app = express();
global.__root = __dirname + '/app';
var db = require('./app/config/db');
// bundle our routes
var router = express.Router();

var PORT = process.env.PORT || 8080;
app.use(express.static(__root));

/* Direct index */
router.get('', function () {
  response.sendFile('index.html');
});

// var UserController = require(__root + 'user/UserController');
// app.use('/api/users', UserController);

app.listen(PORT, function () {
  console.log('\033c');
  console.log('*=================================*');
  console.log('*  Server listening on port ' + PORT + '  *');
  console.log('*=================================*');
});
