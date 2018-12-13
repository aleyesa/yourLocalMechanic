"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtAuthenticate = exports.localAuthenticate = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _strategies = require("../api/resources/auth/strategies");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_passport.default.use(_strategies.jwtStrategy);

_passport.default.use(_strategies.localStrategy);

var localAuthenticate = _passport.default.authenticate('local', {
  session: false
});

exports.localAuthenticate = localAuthenticate;

var jwtAuthenticate = _passport.default.authenticate('jwt', {
  session: false
});

exports.jwtAuthenticate = jwtAuthenticate;