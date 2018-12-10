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

const messageSchema = new Schema({
  message: String,
  sender: {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client'
    },
    carShop: {
      type: Schema.Types.ObjectId,
      ref: 'CarShopOwner'
    }
  },
  receiver: {
    client: {
      type: Schema.Types.ObjectId,
      reference: 'Client'
    },
    carShop: {
      type: Schema.Types.ObjectId,
      reference: 'CarShopOwner'
    }
  },
  timestamp: {
    type: Date,
    default: Date.now()
  }
});

const Message = mongoose.model('Message', messageSchema);

export {
  Message
};