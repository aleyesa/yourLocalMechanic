import mongoose from 'mongoose';

const Schema = mongoose.Schema;
//Tasks: 
//link each schema together
//main entry point is expert schema
//What I think is needed:
/*
unique collection of experts
expert account creation
  -username
  -password
Specializes in:
  -about the expert
  -education?
  -experience in the field
  -specifics
  -general
  -fee(his worth)
Want to contact the expert?
-some type of messaging system
  -create an inquire
  -show as a message

Billing(separate?)
*/
const inboxSchema = new Schema({
  messages: [String]
});

const inquireSchema = new Schema({
  question: String,
  solution: String,
  done: {
    type: Boolean,
    default: false
  },
  client: String
});

const billSchema = new Schema({
  workFees: [String],
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
      check: Boolean,
      other: Boolean
    }
  ]
});

const expertSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: 'Password is needed'
  },
  personalInfo: {
    firstName: String,
    lastName: String,
    contactInfo: {
      email: String,
      phone: String
    },
    area: String
  },
  expertSkills: {
    experience:
    {
      education: String,
      qualifications: String
    },
    specialties: String,
    fee: {
      type: String,
      default: 'negotiable'
    }
  }
});

const Expert = mongoose.model('Expert', expertSchema);
const Inbox = mongoose.model('Inbox', inboxSchema);
const Inquire = mongoose.model('Inquire', inquireSchema);
const Bill = mongoose.model('Bill', billSchema);

export { 
  Expert,
  Inbox,
  Inquire,
  Bill
};