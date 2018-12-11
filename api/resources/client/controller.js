import { Client } from './model';

const getAllClients = (req, res) => {
  Client
  .find()
  .then(clients => {
    res.json(clients);
    console.log(clients[0].messageBox);
  })
  .catch(err => res.json(err));
};

const getClientInfo = (req, res) => {
  Client
  .findById(req.params.id)
  .populate({
    path: 'messageBox',
    model: 'Message'
  })
  .then(client => res.json(client))
  .catch(err => res.json(err));
};

const createClient = (req, res) => {
  Client
  .create(req.body)
  .then(client => res.json(`The user ${client.username} has been created.`))
  .catch(err => res.json(err));
};

const updateClient = (req, res) => {
  Client
  .findByIdAndUpdate(req.params.id, req.body)
  .then(client => res.json(client))
  .catch(err => res.json(err));
};

//If user decides to delete account, the user will be logged out if successfully deleted.
const deleteClient = (req, res) => {
  Client
  .findOneAndDelete(req.params.id)
  .then(client => res.json(`The user ${client.username} has been deleted.`))
  .catch(err => res.json(err));
};

export {
  getAllClients,
  getClientInfo,
  createClient,
  updateClient,
  deleteClient
};

