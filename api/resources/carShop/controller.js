import {CarShop1} from './model';

const getCarShops = (req, res) => {
  CarShop1
  .find()
  .then(carShops => res.json(carShops));
};

const getSpecificCarShop = (req, res) => {
  CarShop1
  .findById(req.params.id)
  .then(carShop => {
    res.json(carShop);
  });
};

const addCarShop = (req, res) => {
  CarShop1
  .create(req.body)
  .then(carShop => res.json(carShop));
};

const updateCarShopInfo = (req, res) => {
  CarShop1
  .findByIdAndUpdate(req.params.id, req.body)
  .then(updatedInfo => res.json(updatedInfo));
};

const removeCarShop = (req, res) => {
  CarShop1
  .findByIdAndDelete(req.params.id)
  .then(carShop => res.json('car shop has been removed.'));
};

export {
  getCarShops,
  getSpecificCarShop,
  addCarShop,
  updateCarShopInfo,
  removeCarShop
};