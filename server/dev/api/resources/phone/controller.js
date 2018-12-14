import { Phone } from './model';

const getAllPhoneNumbers = (req, res) => {

  Phone
  .find()
  .then(phoneNumber => res.json(phoneNumber))
  .catch(err => res.status(400).json('no phone numbers found.'));

};

const getPhoneNumber = (req, res) => {

  Phone
  .findById(req.params.id)
  .then(phoneNumber => res.json(phoneNumber))
  .catch(err => res.status(400).json('could not find phone number.'));

};

const addPhoneNumber = (req, res) => {

  Phone
  .create(req.body)
  .then(phoneNumber => res.json(phoneNumber))
  .catch(err => res.status(400).json('failed to add phone number.'));

};

const updatePhoneNumber = (req, res) => {

  Phone
  .findByIdAndUpdate(req.params.id, req.body)
  .then(phoneNumber => res.json(phoneNumber))
  .catch(err => res.status(400).json('failed to update phoneNumber.'));

};

const removePhoneNumber = (req, res) => {

  Phone
  .findByIdAndDelete(req.params.id)
  .then(phoneNumber => res.json('The phone Number was deleted'))
  .catch(err => res.status(400).json('failed to remove phone number.'));
  
};

export {
  getAllPhoneNumbers,
  getPhoneNumber,
  addPhoneNumber,
  updatePhoneNumber,
  removePhoneNumber
};