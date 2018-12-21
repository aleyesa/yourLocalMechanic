"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _passportMiddleware = require("../../../middleware/passportMiddleware");

var _controller = require("./controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addressRouter = _express.default.Router();

addressRouter.route('/').get(_passportMiddleware.jwtAuthenticate, _controller.getAllAddresses).post(_passportMiddleware.jwtAuthenticate, _controller.addAddress);
addressRouter.route('/:id').get(_passportMiddleware.jwtAuthenticate, _controller.getAddressById).put(_passportMiddleware.jwtAuthenticate, _controller.updateAddress).delete(_passportMiddleware.jwtAuthenticate, _controller.removeAddress);
var _default = addressRouter;
exports.default = _default;