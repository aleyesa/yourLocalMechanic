import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const carShopSchema = new Schema({
  carShopInfo: {
    shopName: String,
    contactInfo: {
      email: {
        type: Schema.Types.ObjectId,
        ref: 'CarShopOwner'
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

const CarShop1 = mongoose.model('CarShop', carShopSchema);

export {
  CarShop1
};