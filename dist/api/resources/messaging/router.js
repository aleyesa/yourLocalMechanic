"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _controller = require("./controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messagingRouter = _express.default.Router();

messagingRouter.route('/').get(_controller.getAllMessages).post(_controller.createMessage);
messagingRouter.route('/thread').get(_controller.getMessageThread).delete(_controller.deleteConversation);
messagingRouter.route('/:id').put(_controller.editMessage).delete(_controller.deleteMessage);
var _default = messagingRouter;
exports.default = _default;