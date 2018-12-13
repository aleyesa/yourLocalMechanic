import { CarShopOwner } from './model';

const getAllCarShopOwner = (req, res) => {

  CarShopOwner
  .find()
  .populate({
    path: 'clientMessages',
    select: 'firstName lastName',
    model: 'Client'
  })
  .populate({
    path: 'carShopInfo',
    select: 'shopName',
    model: 'CarShop'
  })
  .then(owner => res.json(owner))
  .catch(err => res.json('could not find any car shop owners.'));

};

const getCarShopOwnerInfo = (req, res) => {

  CarShopOwner
  .findById(req.params.id)
  .populate({
    path: 'messageBox',
    model: 'Message',
    options: { 
      sort: {
      'timestamp': 1
      }
    }
  })
  .populate({
    path: 'carShopInfo',
    model: 'CarShop',
    populate: [{
      path: 'carShopPhone',
      model: 'Phone'
    },
    {
      path: 'location',
      model: 'Address'
    }]
  })
  .then(ownerInfo => {

    res.json(ownerInfo);

  })
  .catch(err => res.json('could not find any car shop owners.'));

};

const createAccount = (req, res) => {

    CarShopOwner
    .create(req.body)
    .then(owner => {
      res.json(owner);
    })
    .catch(err => {

      res.json({
      message: 'could not create account.',
      err
    });

  });

};

const updateCarShopOwnerInfo = (req, res) => {

  CarShopOwner
  .findByIdAndUpdate(req.params.id, req.body)
  .then(updatedInfo => res.json(updatedInfo))
  .catch(err => res.json('failed to update info.'));

};

const deleteCarShopOwnerAccount = (req, res) => {

  CarShopOwner
  .findByIdAndDelete(req.params.id)
  .then(account => res.json('Car shop owner has been removed.'))
  .catch(err => res.json('failed to delete account.'));

};

export {
  getAllCarShopOwner,
  getCarShopOwnerInfo,
  createAccount,
  updateCarShopOwnerInfo,
  deleteCarShopOwnerAccount
};