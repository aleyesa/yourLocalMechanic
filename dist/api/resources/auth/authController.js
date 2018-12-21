"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newJWT = exports.validateLogin = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("../../../config/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createAuthToken = function createAuthToken(userId) {
  return _jsonwebtoken.default.sign({
    userId: userId
  }, _config.JWT_SECRET, {
    subject: "".concat(userId),
    expiresIn: _config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
}; //request a JWT/ A valid username and password are required, and a new token is given in exchange.


var validateLogin = function validateLogin(req, res) {
  var authToken = createAuthToken(req.user._id);
  res.status(200).json({
    authToken: authToken
  });
}; //request a new JWT with a laster expiry date. A valid, non-expired JWT is required.


exports.validateLogin = validateLogin;

var newJWT = function newJWT(req, res) {
  var authToken = createAuthToken(req.user._id);
  res.status(200).json({
    authToken: authToken
  });
};

exports.newJWT = newJWT;