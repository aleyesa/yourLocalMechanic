import { Message } from './model';
import { Client } from '../client/model';
import { CarShopOwner } from '../carShopOwner/model';

const getAllMessages = (req, res) => {

  //first we do a find query to find the specific client
  //and get the car shop id
  //then we can use the other request to get the thread
  console.log(req.query);
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
  //Scenerio:
  //a user is logged in:
  //if client:
    //the client finds a car shop
    //sends a message and thus creates a document in the message collection
    //when creating the message we push the created message id to the current client thats logged in
    //the client should now have a list of messages sent out to the carshops

  //if carShop:
    //the carshop should receive a message from a client

  Message
  .create(req.body)
  .then(message =>
  {
    if(message.sender.client) {
      console.log('message has been added to the Message collection.');
      console.log(message);
      Client
      .findByIdAndUpdate(message.sender.client, 
        { 
          $addToSet: {
            carShopMessages: message.receiver.carShop
          }
        })
        .then(client => {
          console.log(`car shop added to carShopMessages.`);
        });

        CarShopOwner
        .findByIdAndUpdate(message.receiver.carShop, 
        { 
          $addToSet: {
            clientMessages: message.sender.client
          }
        })
        .then(carShop => {
          console.log(`client has been added to clientMessages.`);
        });
      } else {
        console.log(message);
        CarShopOwner
        .findByIdAndUpdate(message.sender.carShop, 
          { 
            $addToSet: {
              clientMessages: message.receiver.client
            }
          })
          .then(carShop => {
            console.log(`client has been added to clientMessages.`);
          });
  
          Client
          .findByIdAndUpdate(message.receiver.client, 
          { 
            $addToSet: {
              carShopMessages: message.sender.carShop
            }
          })
          .then(message => {
            res.json(`carshop has been added to carShopMessages.`);
          });
      }
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
  .then(thread => { 
    if(thread.sender.client){
      Client
      .findByIdAndUpdate(thread.sender.client,
      {
        $pull: {
          messageBox: thread._id
        }
      })
      .then(client => console.log(`message deleted from senders end.`));

      CarShopOwner
      .findByIdAndUpdate(thread.receiver.carShop,
        {
          $pull: {
            messageBox: thread._id
          }
        })
        .then(carShop => console.log(`message deleted from receivers end.`));
      } else {

        CarShopOwner
        .findByIdAndUpdate(thread.sender.carShop,
        {
          $pull: {
            messageBox: thread._id
          }
        })
        .then(carShop => console.log(`message deleted from senders end.`));
  
        Client
        .findByIdAndUpdate(thread.receiver.client,
          {
            $pull: {
              messageBox: thread._id
            }
          })
          .then(client => console.log(`message deleted from receivers end.`));
      }


  })
  .catch(err => res.json('failed to delete message.'));
};

export {
  getAllMessages,
  getMessageThread,
  createMessage,
  editMessage,
  deleteMessage
};