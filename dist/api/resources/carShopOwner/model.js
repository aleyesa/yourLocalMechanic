"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarShopOwner = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// mongoose.Promise = global.Promise;
var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var Schema = _mongoose.default.Schema;
/*
 - add rules for password
*/

var carShopOwnerSchema = new Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    required: 'Username is required.',
    minlength: 1,
    unique: true,
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
  password: {
    type: String,
    required: 'Password is required.',
    minlength: 8,
    maxlength: 72,
    trim: true
  },
  carShopInfo: {
    type: Schema.Types.ObjectId,
    ref: 'CarShop'
  },
  clientMessages: [{
    type: Schema.Types.ObjectId,
    ref: 'Client'
  }]
}); //functions to help validate and secure passwords.

carShopOwnerSchema.methods.comparePw = function (pw, pwHash) {
  return _bcryptjs.default.compare(pw, pwHash);
};

carShopOwnerSchema.statics.hashPassword = function (password) {
  return _bcryptjs.default.hash(password, 10);
};

var CarShopOwner = _mongoose.default.model('CarShopOwner', carShopOwnerSchema);

exports.CarShopOwner = CarShopOwner;