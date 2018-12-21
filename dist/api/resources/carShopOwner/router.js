"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _passportMiddleware = require("../../../middleware/passportMiddleware");

var _controller = require("./controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var carShopOwnerRouter = _express.default.Router();

carShopOwnerRouter.route('/').get(_passportMiddleware.jwtAuthenticate, _controller.getAllCarShopOwner) // .get(getAllCarShopOwner)
.post(_controller.createAccount);
carShopOwnerRouter.route('/:id').get(_passportMiddleware.jwtAuthenticate, _controller.getCarShopOwnerInfo).put(_passportMiddleware.jwtAuthenticate, _controller.updateCarShopOwnerInfo).delete(_passportMiddleware.jwtAuthenticate, _controller.deleteCarShopOwnerAccount);
var _default = carShopOwnerRouter;
exports.default = _default;