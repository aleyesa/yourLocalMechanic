import { CarShop1 } from './model';
import { CarShopOwner } from '../carShopOwner/model';

const getAllCarShopsForTest = (req, res) => {
  CarShop1
  .find()
  .populate('email', 'username')
  .then(carShops => res.json(carShops));
};




const getCarShops = (req, res) => {

  if(req.params.city !== ' ' &&
        req.params.state !== ' ' &&
        req.params.zipcode === ' ') {
    
    CarShop1
    .find({
      'location.address.city':  req.params.city,
      'location.address.state': req.params.state
    })
    .populate('email', 'username')
    .then(carShops => res.json(carShops));
    console.log('city and state is present');
  //if zipcode is present
  }else if(req.params.zipcode !== ' '){
    CarShop1
    .find({
      'location.address.zipcode': req.params.zipcode
    })
    .populate('email', 'username')
    .then(carShops => res.json(carShops));
      
    console.log('only zipcode is present');
  }else {
    res.json('Please input either a city and state or zipcode.');
  }
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

  getAllCarShopsForTest,



  getCarShops,
  getSpecificCarShop,
  addCarShop,
  updateCarShopInfo,
  removeCarShop
};