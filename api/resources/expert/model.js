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
const personalInfoSchema = new Schema({
  firstName: String,
  lastName: String,
  contactInfo: {
    email: String,
    phone: String
  },
  area: String
});

const expertSkillsSchema = new Schema({
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
});

const inquireSchema = new Schema({
  question: String,
  solution: String,
  client: String
});

const expertInbox = new Schema({
  messages: [String]
});

const workDoneSchema = new Schema({
  work: [String]
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
  }
});

const Expert = mongoose.model('Expert', expertSchema);
const PersonalInfo = mongoose.model('PersonalInfo', personalInfoSchema);
const ExpertSkills = mongoose.model('ExpertSkills', expertSkillsSchema);
const Inquire = mongoose.model('Inquire', inquireSchema);
const WorkDone = mongoose.model('WorkDone', workDoneSchema);
const Bill = mongoose.model('Bill', billSchema);

console.log(Expert);

export { 
  Expert,
  PersonalInfo,
  ExpertSkills,
  Inquire,
  WorkDone,
  Bill
};