import { Message } from './model';
import { Client } from '../client/model';
import { CarShopOwner } from '../carShopOwner/model';

const getAllMessages = (req, res) => {

  Message
  .find()
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
  .catch(err => res.status(400).json(err));

};

const getMessageById = (req, res) => {
  Message
  .findById(req.params.id)
  .then(msg => res.json(msg))
  .catch(err => res.json(err));
};

const getMessageThread = (req, res) => {
  Message
  .find()
  .or([
    {
      "sender.client": req.query.client,
      "receiver.carShop": req.query.carShop
    }
    ,
    { 
      "sender.carShop": req.query.carShop,
      "receiver.client": req.query.client
    }
  ])
  // Message
  // .find()
  // .and([
  //   {
  //     "user.client": req.query.client,
  //     "user.carShop": req.query.carShop
  //   }
  // ])
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
  .then(messages => { 
    if(messages.length == 0) {
      res.json('No conversations were found.');
    } else {
      res.json(messages);
    }
  })
  .catch(err => res.status(400).json(err));

};

const createMessage = (req, res) => {

  Message
  .create(req.body)
  .then(message =>  {

    if(message.sender.client) {
      Client
      .findByIdAndUpdate(message.sender.client, 
      { 
        $addToSet: {
          carShopMessages: message.receiver.carShop
        }
      })
      .then(client => {
        console.log(`car shop added to carShopMessages.`);
      })
      .catch(err => console.log('failed to add car shop to carShopMessages.'));


      CarShopOwner
      .findByIdAndUpdate(message.receiver.carShop, 
      { 
        $addToSet: {
          clientMessages: message.sender.client
        }
      })
      .then(carShop => {
        console.log(`client has been added to clientMessages.`);
      })
      .catch(err => console.log('failed to add client to clientMessages.'));

    } else {
      
      CarShopOwner
      .findByIdAndUpdate(message.sender.carShop, 
        { 
          $addToSet: {
            clientMessages: message.receiver.client
          }
        })
        .then(carShop => {
          console.log(`client has been added to clientMessages.`);
        })
        .catch(err => console.log('failed to add client to clientMessages.'));

        Client
        .findByIdAndUpdate(message.receiver.client, 
        { 
          $addToSet: {
            carShopMessages: message.sender.carShop
          }
        })
        .then(message => {
          console.log(`carshop has been added to carShopMessages.`);
        })
        .catch(err => console.log('failed to add car shop to carShopMessages.'));
        } 

        res.json('message was created.');

  })
  .catch(err => res.status(400).json(err));

};

const editMessage = (req, res) => {

  Message
  .findByIdAndUpdate(req.params.id, req.body)
  .then(editedMessage => res.json(editedMessage))
  .catch(err => res.status(400).json('failed to edit message.'));

};

const deleteMessage = (req, res) => {

  Message
  .findByIdAndDelete(req.params.id)
  .then(message => { 

    res.json(message);

  })
  .catch(err => res.status(400).json('failed to delete message.'));

};

const deleteConversation = (req, res) => {

  Message
  .find()
  .or([
    {
      "sender.client": req.body.client,
      "receiver.carShop": req.body.carShop
    }
    ,
    { 
      "sender.carShop": req.body.carShop,
      "receiver.client": req.body.client
    }
  ])
  .deleteMany()
  .then(thread => {
    Client
    .findByIdAndUpdate(req.body.client,
    {
      $pull: {
        carShopMessages: req.body.carShop
      }
    })
    .then(client => console.log(`car shop conversation was removed.`));

    CarShopOwner
    .findByIdAndUpdate(req.body.carShop,
      {
        $pull: {
          clientMessages: req.body.client
        }
      })
      .then(carShop => console.log(`client conversation was removed.`));
    
    res.json('conversation was deleted.');

  })
  .catch(err => res.status(400).json('failed to remove conversation.'));

};

export {
  getAllMessages,
  getMessageById,
  getMessageThread,
  createMessage,
  editMessage,
  deleteMessage,
  deleteConversation
};