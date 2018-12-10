import { Message } from './model';

const getAllMessages = (req, res) => {
  Message
  .find()
  .or([
    {
      "sender.client": req.query.senderClient
    },
    {
      'sender.carShop': req.query.senderCarShop
    }
  ])
  .populate([{
    path: 'sender.client',
    model: 'Client'
  },
  {
    path: 'sender.carShop',
    model: 'CarShopOwner' 
  },
  {
    path: 'receiver.client',
    model: 'Client' 
  },
  {
    path: 'receiver.carShop',
    model: 'CarShopOwner' 
  }
  ])
  .sort('-timestamp')
  .then(messages => res.json(messages))
  .catch(err => res.json(err));
};

const getMessageThread = (req, res) => {
  Message
  .find()
  .or([
    {
      "sender.client": req.query.senderClient,
      "receiver.carShop": req.query.receiverCarShop
    }
    ,
    { 
      "sender.carShop": req.query.senderCarShop,
      "receiver.client": req.query.receiverClient
    }
  ])
  .populate([{
    path: 'sender.client',
    model: 'Client'
  },
  {
    path: 'sender.carShop',
    model: 'CarShopOwner' 
  },
  {
    path: 'receiver.client',
    model: 'Client' 
  },
  {
    path: 'receiver.carShop',
    model: 'CarShopOwner' 
  }
  ])
  .sort('timestamp')
  .then(messages => res.json(messages))
  .catch(err => res.json(err));
};

const createMessage = (req, res) => {
  //get the user id thats loggged in.
  //and set the senderId as the user id.
  Message
  .create(req.body)
  .then(message =>
  {
    console.log('message has been added to the Message collection.');
    res.json(message);
    // CarShopOwner
    // .findByIdAndUpdate(req.body.ownerId, {
    //   'messageBox': message._id,
    //   'senderId': req.body.ownerId
    // })
    // .then(ownerInfo => {
    //   console.log('message has been added to the specified CarShopOwner Collection.')
    //   res.json(ownerInfo);
    // })
  })
  .catch(err => res.json(err));
};

const editMessage = (req, res) => {
  Message
  .findByIdAndUpdate(req.params.id, req.body)
  .then(editedMessage => res.json(editedMessage))
  .catch(err => res.json('failed to edit message.'));
};

const deleteMessage = (req, res) => {
  Message
  .findByIdAndDelete(req.params.id)
  .then(thread => res.json('deleted thread.'))
  .catch(err => res.json('failed to delete message.'));
};

export {
  getAllMessages,
  getMessageThread,
  createMessage,
  editMessage,
  deleteMessage
};