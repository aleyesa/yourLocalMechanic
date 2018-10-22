import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const inboxSchema = new Schema({
  messages: [{
    type: [Schema.Types.ObjectId],
    ref: 'Inquire',
    unread: {
      type: Boolean,
      default: true
    }
    }]
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

const Inbox = mongoose.model('Inbox', inboxSchema);
const Inquire = mongoose.model('Inquire', inquireSchema);

export {
  Inbox,
  Inquire
};