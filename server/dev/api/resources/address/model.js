import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const addressSchema = new Schema({

    address: {
      streetAddress: {
        type: String,
        required: [true, 'Input the street address.']
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

const Address = mongoose.model('Address', addressSchema);

export { Address };

