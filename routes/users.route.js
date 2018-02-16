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

router.get('/:id', function (request, response) {
  userModel.findById(request.params.id, {}, null, function (err, userFounded) {
    if (err) {
      return response.status(500).send({
        message: 'There was a problem retrieving the user',
        error: err
      });
    }
    else {
      response.send({
        message: 'User founded by Id',
        data: userFounded
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

router.put('/:id', function (request, response) {
  // response.send('accediendo a usuarios con el metodo put');
  // console.log('log put: ', request.body);
  userModel.findOneAndUpdate(request.params.id, request.body, {new: true}, function (err,userUpdated) {
    if (err) {
      return response.status(500).send({
        message: 'There was a problem updating a user',
        error: err
      });
    }
    else {
      response.send({
        message: 'A user has been updated',
        data: userUpdated
      });
    }
  });
});

router.delete('/', function (request, response) {
  response.send('accediendo a usuarios con el metodo delete');
});

router.get('/find', function (request, response) {
  response.send('buscando un users con el metodo get');
});

module.exports = router;