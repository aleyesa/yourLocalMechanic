"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Message = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var messageSchema = new Schema({
  subject: String,
  message: String,
  sender: {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client'
    },
    carShop: {
      type: Schema.Types.ObjectId,
      ref: 'CarShopOwner'
    }
  },
  receiver: {
    client: {
      type: Schema.Types.ObjectId,
      reference: 'Client'
    },
    carShop: {
      type: Schema.Types.ObjectId,
      reference: 'CarShopOwner'
    }
  },
  timestamp: {
    type: Date,
    default: Date.now()
  }
});

var Message = _mongoose.default.model('Message', messageSchema);

exports.Message = Message;