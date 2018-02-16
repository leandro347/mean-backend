var express = require('express');
var router = express.Router();
var userModel = require('../models/user.model');

router.get('/', function (request, response) {
  // response.send('accediendo a usuarios con el metodo get');
  userModel.find({}, {}, null, function (err, userList) {
    if(err){
      return response.status(500).send({
        message: 'There was a problem retrieving the user list',
        error: err
      });
    }
    else{
      response.send({
        message: 'The user list has been retrieved',
        data: userList
      });
    }
  });
});

router.post('/', function (request, response) {
// userModel.create(request.body, function (err, user) {
// });
  var newUser = new userModel(request.body);
  newUser.save(function (err, userCreated) {
    if(err){
        return response.status(500).send({
          message: 'There was a problem at registering the user',
          error: err
        });
    }
    else{ 
      response.send({
        message: 'A new user has been created',
        data: userCreated
      });
    }
  });
});

router.put('/', function (request, response) {
  response.send('accediendo a usuarios con el metodo put');
  console.log('log put: ', request.body);
});

router.delete('/', function (request, response) {
  response.send('accediendo a usuarios con el metodo delete');
});

router.get('/find', function (request, response) {
  response.send('buscando un users con el metodo get');
});

module.exports = router;