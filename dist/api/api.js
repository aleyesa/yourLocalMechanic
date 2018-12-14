"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _router = _interopRequireDefault(require("./resources/carShopOwner/router"));

var _router2 = _interopRequireDefault(require("./resources/client/router"));

var _router3 = _interopRequireDefault(require("./resources/address/router"));

var _router4 = _interopRequireDefault(require("./resources/phone/router"));

var _router5 = _interopRequireDefault(require("./resources/carShop/router"));

var _router6 = _interopRequireDefault(require("./resources/messaging/router"));

var _authRouter = _interopRequireDefault(require("./resources/auth/authRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(app) {
  app.use('/api/carshopowner', _authRouter.default);
  app.use('/api/carshop', _router5.default);
  app.use('/api/client', _router2.default);
  app.use('/api/address', _router3.default);
  app.use('/api/phone', _router4.default);
  app.use('/api/carshopowner', _router.default);
  app.use('/api/message', _router6.default);
};

exports.default = _default;