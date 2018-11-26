import { CarShop } from '../carShop/model';
import { CarShopOwner } from './model';

const getAllCarShopOwner = (req, res) => {
  CarShopOwner
  .find()
  .populate({
    path: 'carShopInfo',
    model: 'CarShop'
  })
  .populate({
    path: 'carShopInfo',
    model: 'CarShop',
    populate: {
      path: 'email',
      select: 'username',
      model: 'CarShopOwner'
    }
  })
  .then(owner => res.json(owner))
  .catch(err => res.json('could not find any car shop owners.'));
};

const getCarShopOwnerInfo = (req, res) => {
  CarShopOwner
  .findById(req.params.id)
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
    .catch(err => res.json('could not create account.'));
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