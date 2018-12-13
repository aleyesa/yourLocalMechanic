"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Address = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var addressSchema = new Schema({
  address: {
    street: {
      streetNumber: {
        type: String,
        required: [true, 'Input the street number']
      },
      streetName: {
        type: String,
        required: [true, 'Input the streetName.']
      }
    },
    city: {
      type: String,
      required: [true, 'Input the city.']
    },
    state: {
      type: String,
      required: [true, 'Input the state.']
    },
    zipcode: {
      type: String,
      required: [true, 'Input the zipcode.']
    }
  }
});

var Address = _mongoose.default.model('Address', addressSchema);

exports.Address = Address;