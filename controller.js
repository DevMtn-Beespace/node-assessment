var app = require('./server.js');
var users = require('./users.json');
// console.log(users);

module.exports = {
  getUsers: function(req, res, next){
    var response = [];
    if (req.query.language) {
      for (var i = 0; i <users.length; i++) {
        if (req.query.language === users[i].language)
        response.push(users[i]);
      }
    } else {
        for (var i = 0; i <users.length; i++) {
        response.push(users[i]);
        }
    }
    console.log("GET USERS sighting");
    res.status(200).json(response);
  },
  getUsersByPrivilege: function(req, res, next) {
    console.log(req.params.privilege);
    var response = [];
    for (var i = 0; i <users.length; i++) {
      if (req.params.privilege === users[i].type)
      response.push(users[i]);
    }
    console.log("GET USERS By TYPE sighting");
    res.status(200).json(response);
  },
  createUser: function(req, res, next){
    // get the last obj in array, get id:
    var lastId = users[users.length - 1].id + 1;
    var newUser = req.body;
    newUser.id = lastId;
    console.log(newUser);
    users.push(newUser);
    console.log("CREATE USER sighting");
    res.status(200).send("new User created");
  },
  createUserByType: function(req, res, next){
    if (req.params.type === "admin" || req.params.type === "moderator" || req.params.type === "user") {
      var lastId = users[users.length - 1].id + 1;
      var newUser = req.body;
      newUser.id = lastId;
      newUser.type = req.params.type;
      console.log(newUser);
      users.push(newUser);
      console.log("CREATE USER BY TYPE sighting");
      res.status(200).send("new User created");
    } else {
      res.send("not a valid user type");
    }
  },
  updateLanguage: function(req, res, next) {
    console.log(req.body.language, req.params.id);
    for (var i = 0; i <users.length; i++) {
      if (parseInt(req.params.id) === users[i].id) {
        users[i]["language"] = req.body.language;
        console.log(users[i]);
      }
    }
    console.log(users);
    console.log("UPDATE USERS LANGUAGE sighting");
    res.status(200).send("User updated");
  },
  updateForum: function(req, res, next) {
    console.log(req.body.add, req.params.id);
    var index = parseInt(req.params.id);
    for (var i = 0; i <users.length; i++) {
      if (index === users[i].id) {
        users[i].favorites.push(req.body.add);
      }
    }
    console.log("UPDATE USERS FORUM sighting");
    res.status(200).send("User updated");
  },
  deleteForum: function(req, res, next){
    var index = parseInt(req.params.id);
    if (req.params.favorite) {
      for (var i = 0; i <users.length; i++) {
        if (index === users[i].id) {
          var remove = users[i].favorite.indexOf(req.params.favorite);
          if (remove > -1) {
            users[i].favorite.splice(remove, 1);
          }
        }
      }
    } else {
      res.status(200).send("add ?favorite=yourfav to url");
    }
    console.log("DELETE USERS FORUM sighting");

  }
};
