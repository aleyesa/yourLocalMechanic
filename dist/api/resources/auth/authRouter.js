"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _passportMiddleware = require("../../../middleware/passportMiddleware");

var _authController = require("./authController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authRouter = _express.default.Router(); // POST /api/users/ to request to register a new user, with a given username and password


authRouter.post('/register/', _authController.registerUser); // POST /api/auth/login to request a JWT/ A valid username and password are required, 
//and a new token is given in exchange.

authRouter.post('/login', _passportMiddleware.localAuthenticate, _authController.validateLogin); // GET /api/protected to make a request for a protected API endpoint. 
// A valid, non-expired JWT is required. 
// You use the same JWT to make as many requests as you like until it expires.

authRouter.get('/protected', _passportMiddleware.jwtAuthenticate, _authController.getUserId); // POST /api/auth/refresh to request a new JWT with a laster expiry date. A valid, non-expired JWT is required.

authRouter.post('/refresh', _passportMiddleware.jwtAuthenticate, _authController.newJWT);
var _default = authRouter;
exports.default = _default;