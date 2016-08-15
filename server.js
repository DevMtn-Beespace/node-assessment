var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
// var session = require('express-session');
// var massive = require('massive');
var users = require('./users.json');

var app = module.exports = express();

app.use(bodyParser.json());

var controller = require('./controller.js');
// console.log("users", users[0]);

//ENDPOINTS
//GET
app.get('/api/users', controller.getUsers); // works for language query too
app.get('/api/users/:privilege', controller.getUsersByPrivilege);
app.get('/api/user/:id', controller.getUserById); // I don't like the "user" vs. "users".

//POST
app.post('/api/users/', controller.createUser);
app.post('/api/users/:type', controller.createUserByType);

//PUT (UDPATE)
app.put('/api/users/language/:id', controller.updateLanguage);
app.put('/api/users/forums/:id', controller.updateForum);
app.put('/api/users/:id', controller.updateUserById);

//DELETE
app.delete('/api/users/forums/:id', controller.deleteForum);
app.delete('/api/users/:id', controller.deleteUser);

var port = 3000;
app.listen(port, function(){
  console.log("listening on port", port);
});
