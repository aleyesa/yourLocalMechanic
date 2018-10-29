import mongoose from 'mongoose';
import Receipt from '../receipt/model';
import {
  Inbox,
  Inquire
 } from '../messaging/model';

const Schema = mongoose.Schema;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Tasks list:
//Nice to have:
//Review/rating system: Stars

const expertSchema = new Schema({
  username: {
    type: String,
    required: 'Username is required',
    unique: true,
    minlength: 1
  },
  password: {
    type: String,
    required: 'Password is needed',
    minlength: 8,
    maxlength: 72,
    trim: true
  },
  carShopInfo: {
    representative: String,
    shopName: String,
    contactInfo: {
      email: {
        type: String,
        validate: {
          validator: (username) => {
            console.log(emailRegex.test(username));
            return emailRegex.test(username);
          },
          message: username => `${username.value} is not a valid username.`
        }
      },
      phone: String
    },
    location: {
      address: {
        street: String,
        city: String,
        state: String,
        zipcode: String
      }
    }
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

const Expert = mongoose.model('Expert', expertSchema);

export { 
  Expert
};