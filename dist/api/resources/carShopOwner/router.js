"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _controller = require("./controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var carShopOwnerRouter = _express.default.Router();

carShopOwnerRouter.route('/').get(_controller.getAllCarShopOwner).post(_controller.createAccount);
carShopOwnerRouter.route('/:id').get(_controller.getCarShopOwnerInfo).put(_controller.updateCarShopOwnerInfo).delete(_controller.deleteCarShopOwnerAccount);
var _default = carShopOwnerRouter;
exports.default = _default;