import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const carShopSchema = new Schema({
  shopName: String,

  carShopOwner: {
    type: Schema.Types.ObjectId,
    ref: 'CarShopOwner'
  },
  shopEmail: String,
  phone: String,
  location: {
    address: {
      street: String,
      city: String,
      state: String,
      zipcode: String
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