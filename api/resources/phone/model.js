import mongoose from 'mongoose';

const phoneNumberRegex = /^\d{10}$/;
const Schema = mongoose.Schema;

const phoneSchema = new Schema({
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
  }
});

const Phone = mongoose.model('Phone', phoneSchema);

export { Phone };