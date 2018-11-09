import { CarShop1 } from '../carShop/model';
import { CarShopOwner } from './model';

const getAllCarShopOwner = (req, res) => {
  CarShopOwner
  .find()
  .populate('carShopInfo')
  .populate('email', 'username')
  .then(owner => res.json(owner));
};

const getCarShopOwnerInfo = (req, res) => {
  CarShopOwner
  .findById(req.params.id)
  .then(ownerInfo => {
    res.json(ownerInfo);
  });
};

const createAccount = (req, res) => {
    CarShopOwner
    .create(req.body)
    .then(owner => {
      res.json(owner);
    });
};

const updateCarShopOwnerInfo = (req, res) => {
  CarShopOwner
  .findByIdAndUpdate(req.params.id, req.body)
  .then(updatedInfo => res.json(updatedInfo));
};

const deleteCarShopOwnerAccount = (req, res) => {
  CarShopOwner
  .findByIdAndDelete(req.params.id)
  .then(account => res.json('Car shop owner has been removed.'));
};

export {
  getAllCarShopOwner,
  getCarShopOwnerInfo,
  createAccount,
  updateCarShopOwnerInfo,
  deleteCarShopOwnerAccount
};