var app = require('./server.js');
var users = require('./users.json');
// console.log(users);

module.exports = {
  getUsers: function(req, res, next){
    var response = [];
    // req.query.state.charAt(0).toUpperCase() + req.query.state.slice(1);
    if (req.query.language) {
      for (var i = 0; i <users.length; i++) {
        if (req.query.language === users[i].language)
        response.push(users[i]);
      }
    } else if (req.query.age) {
      for (var i = 0; i <users.length; i++) {
        if (parseInt(req.query.age) === users[i].age)
        response.push(users[i]);
      }
    } else if (req.query.city) {
      for (var i = 0; i <users.length; i++) {
        if ((req.query.city.charAt(0).toUpperCase() + req.query.city.slice(1)) === users[i].city)
        response.push(users[i]);
      }
    } else if (req.query.state) {
      for (var i = 0; i <users.length; i++) {
        if ((req.query.state.charAt(0).toUpperCase() + req.query.state.slice(1)) === users[i].state)
        response.push(users[i]);
      }
    } else if (req.query.gender) {
      for (var i = 0; i <users.length; i++) {
        if ((req.query.gender.charAt(0).toUpperCase() + req.query.gender.slice(1)) === users[i].gender)
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
  getUserById: function(req, res, next) {
    console.log("GET USER By ID sighting");
    var index = parseInt(req.params.id);
      for (var i = 0; i < users.length; i++) {
        if (index === users[i].id) {
          var response = users[i];
        }
      }
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).send("User Id " + index + " doesn't exist");
    }
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
  updateUserById: function(req, res, next) {
    var index = parseInt(req.params.id);
    for (var i = 0; i < users.length; i++) {
      if (index === users[i].id) {
        var response = users[i];
        for (var prop in users[i]) {
          if (users[i].hasOwnProperty(prop)) {
            console.log(users[i][prop]);
            if (users[i][prop] !== users[i]["id"]) {
              users[i][prop] = req.body[prop];
            }
          }
        }
      console.log(users[i]);
      }
    }
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).send("User Id " + index + " doesn't exist");
    }
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

  },
  deleteUser: function(req, res, next) {
    console.log("DELETE USER sighting");
    var index = parseInt(req.params.id);
    for (var i = 0; i < users.length; i++) {
      if (index === users[i].id) {
        var response = users[i];
      }
    }
    indexRemoved = users.filter(function(el) {
      return el.id !== index;
    });
    if (response) {
      console.log(indexRemoved);
      res.status(200).json(response);
    } else {
      res.status(404).send("User Id " + index + " doesn't exist");
    }
  }
};
