import mongoose from 'mongoose';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const Schema = mongoose.Schema;

const carShopSchema = new Schema({

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
      validator: (email) => {
        console.log(emailRegex.test(email));
        return emailRegex.test(email);
      },
      message: email => `${email.value} is not a valid username.`
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

const CarShop = mongoose.model('CarShop', carShopSchema);

export {
  CarShop
};