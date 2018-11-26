import { MessageBox } from './model';

const getAllMessages = (req, res) => {
  MessageBox
  .find()
  .then(messages => res.json(messages))
  .catch(err => res.json(err));
};

const getMessageThread = (req, res) => {
  MessageBox
  .find({
    senderId: req.body.senderId,
    receiverId: req.body.receiverId
  })
  .then(messages => res.json(messages))
  .catch(err => res.json(err));
};

const createMessage = (req, res) => {
  MessageBox
  .create(req.body)
  .then(message => res.json('message created.'))
  .catch(err => res.json('could not create message.'));
};

const addReply = (req, res) => {
  MessageBox
  .findByIdAndUpdate(req.params.id, req.body)
  .then(reply => res.json('added reply to message.'))
  .catch(err => res.json('could not reply to message.'));
};

export {
  getAllMessages,
  createMessage,
  getMessageThread,
  addReply
};