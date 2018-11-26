import { CarShop } from './model';
import { CarShopOwner } from '../carShopOwner/model';

const getAllCarShopsForTest = (req, res) => {
  CarShop
  .find()
  .populate('email', 'username')
  .then(carShops => res.json(carShops))
  .catch(err => {
    res.json('no carshops found.');
  });
};

const getCarShops = (req, res) => {
  const {city, state, zipcode} = req.query;

  if(city && state && !zipcode) {

    console.log('city and state is present, now searching.');

    CarShop
    .find({
      'location.address.city': city,
      'location.address.state': state
    })
    .then(carshops => res.json(carshops))
    .catch(err => res.json('no carshops found.'));
  
  }else if(zipcode) {

    console.log('zipcode is present, now searching.');
    CarShop
    .find({
      'location.address.zipcode': zipcode
    })
    .then(carshops => res.json(carshops))
    .catch(err => res.json('no carshops found.'));
  
  }else {

    console.log('Please input city and state fields or a zipcode.');
    res.json('Please input the city and state or the zipcode to search for car shops.');
  
  }
};

const getSpecificCarShop = (req, res) => {
  CarShop
  .findById(req.params.id)
  .populate('email', 'username')
  .then(carShop => {
    res.json(carShop);
  })
  .catch(err => res.json('could not find the carshop.'))
};

const addCarShop = (req, res) => {
    CarShop
    .create(req.body)
    .then(carshop => {
      CarShopOwner
      .findByIdAndUpdate(req.params.id, {carShopInfo: carshop._id})
      .then(owner => res.json(owner))
      .catch(err => res.json('could not find car owner.'));
    })
    .catch(err => res.json(err));
};

const updateCarShopInfo = (req, res) => {
  CarShop
  .findByIdAndUpdate(req.params.id, req.body)
  .then(updatedInfo => res.json(updatedInfo))
  .catch(err => res.json('could not update your info.'));
};

const removeCarShop = (req, res) => {
  CarShop
  .findByIdAndDelete(req.params.id)
  .then(carShop => res.json('car shop has been removed.'))
  .catch(err => res.json('could not remove your carshop from list.'));
};

export {

  getAllCarShopsForTest,
  
  getCarShops,
  getSpecificCarShop,
  addCarShop,
  updateCarShopInfo,
  removeCarShop
};