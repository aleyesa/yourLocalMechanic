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

expertSchema.virtual('expertInfoHtml').get(function() {
    let repairList = '';

    this.specialties.forEach(repair => {
      repairList += 
      `
      <h3>${repair.repair}</h3>
      <p>${repair.description}</p>
      <p>${repair.cost}</p>
      `;
    });

    return `
    <div>
      <p hidden>${this._id}<p>
      <h2>${this.carShopInfo.shopName}</h2>
      <p>${this.carShopInfo.representative}</p>
      <h3>Specialties</h3>
      ${repairList}
      <p>${this.labor}</p>
      <h3>Contact</h3>
      <p>${this.carShopInfo.contactInfo.email}</p>
      <p>${this.carShopInfo.contactInfo.phone}</p>
      <h3>Location</h3>
      <p>${this.carShopInfo.location.address.street}, 
        ${this.carShopInfo.location.address.city} 
        ${this.carShopInfo.location.address.state} 
        ${this.carShopInfo.location.address.zipcode}
      </p>
    </div>
    `
});

const Expert = mongoose.model('Expert', expertSchema);

export { 
  Expert
};