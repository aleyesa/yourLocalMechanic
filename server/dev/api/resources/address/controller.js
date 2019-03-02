import { Address } from './model';

const getAllAddresses = (req, res) => {

  Address
  .find()
  .then(address => res.json(address))
  .catch(err => res.json('could not find any addresses.'));

};

const getAddressById = (req, res) => {

  Address
  .findById(req.params.id)
  .then(address => res.json(address))
  .catch(err => res.status(400).json('could not find specific address.'));

};

const addAddress = (req, res) => {

  Address
  .create(req.body)
  .then(createdAddress => res.json(createdAddress))
  .catch(err => res.status(400).json('failed to add the address.'));

};

const updateAddress = (req, res) => {
  Address
  .findByIdAndUpdate(req.params.id, req.body)
  .then(address => {
    res.json(address)
  });



  

};

const removeAddress = (req, res) => {

  Address
  .findByIdAndDelete(req.params.id)
  .then(removedAddress => res.json('address has been removed.'))
  .catch(err => res.status(400).json('failed to remove address.'));
  
};

export {
  getAllAddresses,
  getAddressById,
  addAddress,
  updateAddress,
  removeAddress
}