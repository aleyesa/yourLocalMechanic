"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var Schema = _mongoose.default.Schema;
var clientSchema = new Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    validate: {
      validator: function validator(username) {
        console.log(emailRegex.test(username));
        return emailRegex.test(username);
      },
      message: function message(username) {
        return "".concat(username.value, " is not a valid username.");
      }
    }
  },
  password: String,
  carShopMessages: [{
    type: Schema.Types.ObjectId,
    ref: 'CarShopOwner'
  }]
});

var Client = _mongoose.default.model('Client', clientSchema);

exports.Client = Client;