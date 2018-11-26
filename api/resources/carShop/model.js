import mongoose from 'mongoose';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneNumberRegex = /^\d{10}$/;
const Schema = mongoose.Schema;

const carShopSchema = new Schema({
  shopName: {
    type: String,
    required: [true, 'A car shop name is required.']
  },
  carShopOwner: {
    type: String,
    required: [true, 'The car shop owners name is needed.']
  },
  shopEmail: {
    type: String,
    validate: {
      validator: (email) => {
        console.log(emailRegex.test(email));
        return emailRegex.test(email);
      },
      message: email => `${email.value} is not a valid username.`
    },
    required: [true, 'Please input the main email for your car shop.']
  },
  phone: {
    type: String,
    validate: {
      validator: (phoneNumber) => {
        console.log(phoneNumberRegex.test(phoneNumber));
        return phoneNumberRegex.test(phoneNumber);
      },
      message: phoneNumber => `${phoneNumber.value} is not a valid phone number.`
    },
    required: [true, 'Not a valid phone number, please try again.']
  },
  location: {
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

const CarShop = mongoose.model('CarShop', carShopSchema);

export {
  CarShop
};