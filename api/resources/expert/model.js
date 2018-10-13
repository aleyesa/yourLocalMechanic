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
  },
  aboutMe: String
});

const expertSkillsSchema = new Schema({
  experience:  [String],
  qualifications: [String]
});

const Expert = mongoose.model('Expert', expertSchema);

export { 
  Expert
};