import { CarShop1 } from './model';
import { CarShopOwner } from '../carShopOwner/model';

const getCarShops = (req, res) => {
  // if city and state and zipcode is present
  if(req.params.city !== ' ' &&
     req.params.state !== ' ' &&
     req.params.zipcode !== ' ') {

    CarShop1
    .find({
      'location.address.city':  req.params.city,
      'location.address.state': req.params.state,
      'location.address.zipcode': req.params.zipcode
    }
    , (err, docs) => {
      console.log(docs);
    });
    // .populate('email', 'username')
    // .then(carShops => res.json(carShops));
  }else {
    console.log(false);
  }

  //else if city and state is present

  //else if zipcode is present

  //else if only city or else if only state
  
  // CarShop1
  // .find()
  // .populate('email', 'username')
  // .then(carShops => res.json(carShops));
};

const getSpecificCarShop = (req, res) => {
  CarShop1
  .findById(req.params.id)
  .populate('email', 'username')
  .then(carShop => {
    res.json(carShop);
  })
};

const addCarShop = (req, res) => {
    req.body.email = req.params.id;
    CarShop1
    .create(req.body)
    .then(carshop => {
      CarShopOwner
      .findByIdAndUpdate(req.params.id, {carShopInfo: carshop._id})
      .then(owner => res.json(owner));
    });
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