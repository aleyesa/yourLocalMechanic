"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Phone = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var phoneNumberRegex = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
var Schema = _mongoose.default.Schema;
var phoneSchema = new Schema({
  phone: {
    type: String,
    validate: {
      validator: function validator(phoneNumber) {
        console.log(phoneNumberRegex.test(phoneNumber));
        return phoneNumberRegex.test(phoneNumber);
      },
      message: function message(phoneNumber) {
        return "".concat(phoneNumber.value, " is not a valid phone number.");
      }
    },
    required: [true, 'Not a valid phone number, please try again.']
  }
});

var Phone = _mongoose.default.model('Phone', phoneSchema);

exports.Phone = Phone;