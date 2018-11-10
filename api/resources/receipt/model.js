import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const receiptSchema = new Schema({
  workFees: {
    timeWorked: String,
  },
  tax: Number,
  total: Number,
  client: String,
  paid: Boolean
});

const Receipt = mongoose.model('Receipt', receiptSchema);

export {
  Receipt
};