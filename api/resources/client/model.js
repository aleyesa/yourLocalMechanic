import mongoose from 'mongoose';
import {
  Billing,
  PaymentInfo
} from '../billing/model';
import {
  Inbox,
  Inquire
 } from '../messaging/model';

//How to get notifications when an expert replies to an inquire?

const Schema = mongoose.Schema;

const clientSchema = new Schema({
  username: {
    type: String,
    required: 'username is required',
    unique: true
  },
  password: {
    type: String,
    required: 'password is required'
  }
});

const Client = mongoose.model('Client', clientSchema);

export {
  Client
};

