import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const messageSchema = new Schema({

  subject: String,
  message: String,
  hide: {
    type: Boolean,
    default: false
  },
  sender: {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client'
    },
    carShop: {
      type: Schema.Types.ObjectId,
      ref: 'CarShopOwner'
    },
    removedMsg: {
      type: Boolean,
      default: false
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
    },
    removedMsg: {
      type: Boolean,
      default: false
    }
  },
  timestamp: {
    type: Date,
    default: Date.now()
  }
  
});

// const messageSchema = new Schema({

//   subject: String,
//   message: String,
//   users: {
//     client: {
//       type: Schema.Types.ObjectId,
//       ref: 'Client'
//     },
//     carShop: {
//       type: Schema.Types.ObjectId,
//       ref: 'CarShopOwner'
//     }
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now()
//   }
  
// });


const Message = mongoose.model('Message', messageSchema);

export {
  Message
};