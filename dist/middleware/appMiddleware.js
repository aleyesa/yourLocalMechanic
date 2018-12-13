"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(app, express) {
  app.use(express.json());
  app.use(express.static('public'));
};

exports.default = _default;