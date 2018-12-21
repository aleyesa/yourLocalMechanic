"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteClient = exports.updateClient = exports.createClient = exports.getClientInfo = exports.getAllClients = void 0;

var _model = require("./model");

var getAllClients = function getAllClients(req, res) {
  _model.Client.find().then(function (clients) {
    res.json(clients);
  }).catch(function (err) {
    return res.status(400).json(err);
  });
};

exports.getAllClients = getAllClients;

var getClientInfo = function getClientInfo(req, res) {
  _model.Client.findById(req.params.id).populate({
    path: 'messageBox',
    model: 'Message',
    options: {
      sort: {
        'timestamp': 1
      }
    }
  }).then(function (client) {
    return res.json(client);
  }).catch(function (err) {
    return res.status(400).json(err);
  });
};

exports.getClientInfo = getClientInfo;

var createClient = function createClient(req, res) {
  var requiredFields = ['username', 'password'];
  var missingField = requiredFields.find(function (field) {
    return !(field in req.body);
  }); //check if username and password values are strings

  if (!missingField) {
    if (typeof req.body.username === 'string' && typeof req.body.password === 'string') {
      req.body.username = req.body.username.trim();

      _model.Client.find({
        username: req.body.username
      }).then(function (user) {
        if (!user) {
          console.log("The user '".concat(user.username, " has already been taken."));
        } else {
          if (req.body.password !== req.body.password.trim()) {
            console.log('no spaces allowed in the beginning or end of password.');
          } else {
            if (req.body.password.length < 8) {
              console.log('Password needs to be at least 8 characters long.');
            } else {
              _model.Client.hashPassword(req.body.password).then(function (pw) {
                req.body.password = pw;

                _model.Client.create(req.body).then(function (user) {
                  return res.status(201).json("".concat(user.username, " has been created."));
                });
              }).catch(function (err) {
                return console.log("failed to create user. \n ".concat(err.message, " "));
              });
            }
          }
        }
      });
    } else {
      console.log('username or password is not a string value.');
      res.status(400).json('username or password is not a string value.');
    }
  } else {
    console.log("".concat(missingField, " field is missing."));
    res.status(400).json("".concat(missingField, " field is missing."));
  }
};

exports.createClient = createClient;

var updateClient = function updateClient(req, res) {
  _model.Client.findByIdAndUpdate(req.params.id, req.body).then(function (client) {
    return res.json(client);
  }).catch(function (err) {
    return res.status(400).json(err);
  });
};

exports.updateClient = updateClient;

var deleteClient = function deleteClient(req, res) {
  _model.Client.findOneAndDelete(req.params.id).then(function (client) {
    return res.json("The user ".concat(client.username, " has been deleted."));
  }).catch(function (err) {
    return res.status(400).json(err);
  });
};

exports.deleteClient = deleteClient;