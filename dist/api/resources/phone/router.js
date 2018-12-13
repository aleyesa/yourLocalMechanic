"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _controller = require("./controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var phoneRouter = _express.default.Router();

phoneRouter.route('/').get(_controller.getAllPhoneNumbers).post(_controller.addPhoneNumber);
phoneRouter.route('/:id').get(_controller.getPhoneNumber).put(_controller.updatePhoneNumber).delete(_controller.removePhoneNumber);
var _default = phoneRouter;
exports.default = _default;