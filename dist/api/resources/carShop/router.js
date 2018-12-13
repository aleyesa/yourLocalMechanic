"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _controller = require("./controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var carShopRouter = _express.default.Router();

carShopRouter.route('/all').get(_controller.getAllCarShopsForTest);
carShopRouter.route('/').get(_controller.getCarShops).post(_controller.addCarShop);
carShopRouter.route('/:id').get(_controller.getSpecificCarShop).put(_controller.updateCarShopInfo).delete(_controller.removeCarShop);
var _default = carShopRouter;
exports.default = _default;