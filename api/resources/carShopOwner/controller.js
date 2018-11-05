import { CarShop1 } from '../carShop/model';
import { CarShopOwner } from './model';

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
    .then(ownerId => {
      res.json(ownerId);
      // req.body.contactInfo.email = ownerId._id;
      // CarShop1
      // .create(req.body)
      // .then(carshop => {
      //   res.json(carshop);
      // })
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
  getCarShopOwnerInfo,
  createAccount,
  updateCarShopOwnerInfo,
  deleteCarShopOwnerAccount
};