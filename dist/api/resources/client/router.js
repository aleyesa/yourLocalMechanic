"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _controller = require("./controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clientRouter = _express.default.Router();

clientRouter.route('/').get(_controller.getAllClients).post(_controller.createClient);
clientRouter.route('/:id').get(_controller.getClientInfo).put(_controller.updateClient).delete(_controller.deleteClient);
var _default = clientRouter;
exports.default = _default;