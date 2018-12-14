"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newJWT = exports.validateLogin = exports.getUserId = exports.registerUser = void 0;

var _model = require("../carShopOwner/model");

var _model2 = require("../client/model");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("../../../config/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createAuthToken = function createAuthToken(username) {
  return _jsonwebtoken.default.sign({
    username: username
  }, _config.JWT_SECRET, {
    subject: username,
    expiresIn: _config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
}; //request to register a new user, with a given username and password


var registerUser = function registerUser(req, res) {
  var requiredFields = ['username', 'password'];
  var missingField = requiredFields.find(function (field) {
    return !(field in req.body);
  }); //check if username and password values are strings

  if (!missingField) {
    if (typeof req.body.username === 'string' && typeof req.body.password === 'string') {
      req.body.username = req.body.username.trim();

      _model.CarShopOwner.find({
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
              _model.CarShopOwner.hashPassword(req.body.password).then(function (pw) {
                req.body.password = pw;

                _model.CarShopOwner.create(req.body).then(function (user) {
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

exports.registerUser = registerUser;

var getUserId = function getUserId(req, res) {
  console.log(req.user.username);

  _model.CarShopOwner.findOne({
    username: req.user.username
  }).then(function (user) {
    return res.json({
      username: user.username,
      userId: user._id
    });
  }).catch(function (err) {
    return res.json(err);
  });
}; //request a JWT/ A valid username and password are required, and a new token is given in exchange.


exports.getUserId = getUserId;

var validateLogin = function validateLogin(req, res) {
  var authToken = createAuthToken(req.body.username);
  res.status(200).json({
    authToken: authToken
  });
}; //request a new JWT with a laster expiry date. A valid, non-expired JWT is required.


exports.validateLogin = validateLogin;

var newJWT = function newJWT(req, res) {
  var authToken = createAuthToken(req.user.username);
  res.status(200).json({
    authToken: authToken
  });
};

exports.newJWT = newJWT;