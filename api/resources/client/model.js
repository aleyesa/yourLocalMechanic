import mongoose from 'mongoose';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Schema = mongoose.Schema;

const clientSchema = new Schema({

  firstName: String,
  lastName: String,
  username: {
  type: String,
  validate: {
    validator: (username) => {
      console.log(emailRegex.test(username));
      return emailRegex.test(username);
  },
  message: username => `${username.value} is not a valid username.`
  }
  },
  password: String,
    carShopMessages: [{
      type: Schema.Types.ObjectId,
      ref: 'CarShopOwner'
    }]
    
});

const Client = mongoose.model('Client', clientSchema);

export {
  Client
};

