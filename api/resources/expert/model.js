import mongoose, { Types } from 'mongoose';
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

// const expertSchema = new Schema({
//   username: {
//     type: String,
//     required: 'Username is required',
//     unique: true,
//     minlength: 1
//   },
//   password: {
//     type: String,
//     required: 'Password is needed',
//     minlength: 8,
//     maxlength: 72,
//     trim: true
//   },
//   carShopInfo: {
//     representative: String,
//     shopName: String,
//     contactInfo: {
//       email: {
//         type: String,
//         validate: {
//           validator: (username) => {
//             console.log(emailRegex.test(username));
//             return emailRegex.test(username);
//           },
//           message: username => `${username.value} is not a valid username.`
//         }
//       },
//       phone: String
//     },
//     location: {
//       address: {
//         street: String,
//         city: String,
//         state: String,
//         zipcode: String
//       }
//     }
//   },
//   specialties: [{
//     repair: String,
//     description: [String],
//     cost: {
//       type: String,
//       default: 'Parts + Labor'
//     }
//   }],
//   labor: String
// });
//use this to show list of car shops in search page.
//Probably don't need representative since they can simply just
//add their name when sending a message
const carShopSchema = new Schema({
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

//This is used to create an account + introduce the car shop that
//the owner owns
/* maybe reference the car shop collection under carShopInfo
*/
const carShopOwnerSchema = new Schema({
  username: String,
  password: String,
  carShopInfo: {
    type: Schema.Types.ObjectId,
    ref: 'CarShop'
  }
});

// const Expert = mongoose.model('Expert', expertSchema);
const CarShop = mongoose.model('CarShop', carShopSchema);
const CarShopOwner = mongoose.model('CarShopOwner', carShopOwnerSchema);

export { 
  // Expert,
  CarShop,
  CarShopOwner
};