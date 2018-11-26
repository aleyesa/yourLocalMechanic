import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/*messaging requirements:
  -a way to have client and carshop to interact.

  scenerio:
  1) client goes to main page and searches for a local 
  car shop based on location.

  (assuming the client has logged in)
  2) client sees a carshop and looks at the contact info,
  either the client calls manually or clicks on the message option.

  3) if client decides to use the messaging option, they can simply
  click on the message icon near the car shop email and get on with it.
  *current idea is to find the specific car shop owner id, create message, populate it 
    in client message box and the specified car shop owner.
*/

const messageBoxSchema = new Schema({
  message: String,
  senderId: String,
  receiverId: String,
  timestamp: {
    type: Date,
    default: Date.now()
  }
});
// const inquireSchema = new Schema({
//   question: String,
//   solution: String,
//   done: {
//     type: Boolean,
//     default: false
//   },
//   client: String
// });

const MessageBox = mongoose.model('MessageBox', messageBoxSchema);
// const Inquire = mongoose.model('Inquire', inquireSchema);

export {
  MessageBox
};