import { CarShop } from './model';
import { CarShopOwner } from '../carShopOwner/model';

const getAllCarShopsForTest = (req, res) => {
  console.log(CarShop);
  CarShop
  .find()
  .populate('email', 'username')
  .then(carShops => res.json(carShops));
};

const getCarShops = (req, res) => {
  const {city, state, zipcode} = req.query;

  if(city && state && !zipcode){
    res.json('city and state is present, now searching.');
  }else if(zipcode){
    res.json('zipcode is present, now searching.');
  }else{
    res.json('Please input city and state fields or a zipcode.');
  }
};

const getSpecificCarShop = (req, res) => {
  CarShop
  .findById(req.params.id)
  .populate('email', 'username')
  .then(carShop => {
    res.json(carShop);
  })
};

const addCarShop = (req, res) => {
    req.body.email = req.params.id;
    CarShop
    .create(req.body)
    .then(carshop => {
      CarShopOwner
      .findByIdAndUpdate(req.params.id, {carShopInfo: carshop._id})
      .then(owner => res.json(owner));
    });
};

const updateCarShopInfo = (req, res) => {
  CarShop
  .findByIdAndUpdate(req.params.id, req.body)
  .then(updatedInfo => res.json(updatedInfo));
};

const removeCarShop = (req, res) => {
  CarShop
  .findByIdAndDelete(req.params.id)
  .then(carShop => res.json('car shop has been removed.'));
};

export {

  getAllCarShopsForTest,
  
  getCarShops,
  getSpecificCarShop,
  addCarShop,
  updateCarShopInfo,
  removeCarShop
};