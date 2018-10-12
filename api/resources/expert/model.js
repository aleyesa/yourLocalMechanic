import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const expertSchema = new Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: 'Password is needed'
  }
});

const Expert = mongoose.Collection('Expert', expertSchema);

export default Expert;