"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _passportMiddleware = require("../../../middleware/passportMiddleware");

var _controller = require("./controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var phoneRouter = _express.default.Router();

phoneRouter.route('/').get(_passportMiddleware.jwtAuthenticate, _controller.getAllPhoneNumbers).post(_passportMiddleware.jwtAuthenticate, _controller.addPhoneNumber);
phoneRouter.route('/:id').get(_passportMiddleware.jwtAuthenticate, _controller.getPhoneNumber).put(_passportMiddleware.jwtAuthenticate, _controller.updatePhoneNumber).delete(_passportMiddleware.jwtAuthenticate, _controller.removePhoneNumber);
var _default = phoneRouter;
exports.default = _default;