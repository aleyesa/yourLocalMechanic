import mongoose from 'mongoose';
import Expert from '../expert/model';

const Schema = mongoose.Schema;

const billSchema = new Schema({
  workFees: {
    timeWorked: String,
  },
  tax: Number,
  total: Number,
  client: String,
  paid: Boolean
});

const paymentInfoSchema = new Schema({
  name: String,
  paymentType: [
    {
      card: Boolean,
      cash: Boolean,
      check: Boolean
    }
  ]
});

const Bill = mongoose.model('Bill', billSchema);
const Payment = mongoose.model('Payment', paymentInfoSchema);

export {
  Bill,
  Payment
};