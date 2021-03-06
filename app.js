var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/exampledb');

mongoose.connection.on('error',function () {
  console.log('error..............');
});

mongoose.connection.once('open', function () {
  console.log('We are conected to mongodb ;)');
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

var usersRoute = require('./routes/users.route');

app.get('/',function (request, response) {
  response.send('hello world');
});

app.use('/users', usersRoute);

app.listen(3000,function () {
  console.log('corriendo en el puerto 3000');
});