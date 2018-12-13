"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarShop = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var Schema = _mongoose.default.Schema;
var carShopSchema = new Schema({
  shopName: {
    type: String,
    required: [true, 'A car shop name is required.']
  },
  carShopOwner: {
    type: Schema.Types.ObjectId,
    ref: 'CarShopOwner'
  },
  shopEmail: {
    type: String,
    validate: {
      validator: function validator(email) {
        console.log(emailRegex.test(email));
        return emailRegex.test(email);
      },
      message: function message(email) {
        return "".concat(email.value, " is not a valid username.");
      }
    },
    required: [true, 'Please input the main email for your car shop.']
  },
  carShopPhone: {
    type: Schema.Types.ObjectId,
    ref: 'Phone'
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Address'
  },
  specialties: [{
    repair: String,
    description: [String],
    cost: {
      type: String,
      default: 'Parts + Labor'
    }
  }],
  labor: String
});

var CarShop = _mongoose.default.model('CarShop', carShopSchema);

exports.CarShop = CarShop;