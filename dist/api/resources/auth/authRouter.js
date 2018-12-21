"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _passportMiddleware = require("../../../middleware/passportMiddleware");

var _authController = require("./authController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authRouter = _express.default.Router();

authRouter.post('/login', _passportMiddleware.localAuthenticate, _authController.validateLogin);
authRouter.post('/refresh', _passportMiddleware.jwtAuthenticate, _authController.newJWT);
var _default = authRouter;
exports.default = _default;