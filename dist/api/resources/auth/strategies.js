"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtStrategy = exports.localStrategy = void 0;

var _model = require("../carShopOwner/model");

var _model2 = require("../client/model");

var _passportLocal = _interopRequireDefault(require("passport-local"));

var _passportJwt = _interopRequireDefault(require("passport-jwt"));

var _config = require("../../../config/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Strategy = _passportJwt.default.Strategy,
    ExtractJwt = _passportJwt.default.ExtractJwt;
var localStrategy = new _passportLocal.default.Strategy(function (username, password, callbackfn) {
  _model.CarShopOwner.findOne({
    username: username
  }).then(function (user) {
    user.comparePw(password, user.password).then(function (user) {
      if (user) {
        console.log('Login was successful.');
        return callbackfn(null, user);
      } else {
        console.log('Login was not successful, invalid password.');
        return callbackfn(null, false);
      }
    }).catch(function (err) {
      return console.log('failed to log in as car shop owner.');
    });
  }).catch(function (err) {
    return console.log(err);
  }); // Client
  // .findOne( { username } )
  // .then(user => {
  //   user.comparePw(password, user.password)
  //   .then(user => {
  //     if(user) {
  //       console.log('Login was successful.');
  //       return callbackfn(null, user);
  //     }else {
  //       console.log('Login was not successful, invalid password.');
  //       return callbackfn(null, false);
  //     }
  //   })
  //   .catch(err => console.log('failed to log in as car shop owner.'));
  // })
  // .catch(err => console.log(err));

});
exports.localStrategy = localStrategy;
var jwtStrategy = new Strategy({
  secretOrKey: _config.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  algorithms: ['HS256']
}, function (payload, done) {
  done(null, payload);
});
exports.jwtStrategy = jwtStrategy;