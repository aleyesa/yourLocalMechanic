import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// mongoose.Promise = global.Promise;

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Schema = mongoose.Schema;

const carShopOwnerSchema = new Schema({

  firstName: String,
  lastName: String,
  username: {
    type: String,
    required: 'Username is required.',
    minlength: 1,
    unique: true,
    validate: {
      validator: (username) => {
        console.log(emailRegex.test(username));
        return emailRegex.test(username);
      },
      message: username => `${username.value} is not a valid username.`
    }
  },
  password: {
    type: String, 
    required: 'Password is required.', 
    minlength: 8,
    maxlength: 72,
    trim: true 
  },
  carShopInfo: {
    type: Schema.Types.ObjectId,
    ref: 'CarShop'
  },
  clientMessages: [{
    type: Schema.Types.ObjectId,
    ref: 'Client'
  }]
  
});

//functions to help validate and secure passwords.
carShopOwnerSchema.methods.comparePw = function(pw, pwHash) {
  return bcrypt.compare(pw, pwHash);
};

carShopOwnerSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const CarShopOwner = mongoose.model('CarShopOwner', carShopOwnerSchema);

export {
  CarShopOwner
};