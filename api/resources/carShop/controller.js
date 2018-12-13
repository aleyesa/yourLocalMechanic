import { CarShop } from './model';
import { CarShopOwner } from '../carShopOwner/model';
import { Address } from '../address/model';
import { Phone } from '../phone/model';

const getAllCarShopsForTest = (req, res) => {

  CarShop
  .find()
  .populate({
    path: 'carShopOwner',
    select: 'firstName lastName', 
    model: 'CarShopOwner'
  })
  .populate({
    path: 'carShopPhone',
    select: 'phone',
    model: 'Phone'
  })
  .populate({
    path: 'location', 
    select: 'address',
    model: 'Address'
  })
  .then(carShops => res.json(carShops))
  .catch(err => {

    res.json('no carshops found.');

  });

};

const getCarShops = (req, res) => {

  const {city, state, zipcode} = req.query;

  if(city && state && !zipcode) {

    console.log('city and state is present, now searching.');

    Address
    .find({
      'address.city': city,
      'address.state': state
    })
    .select('_id')
    .then(addresses => {

      const addressId = [];

      addresses.forEach(address => addressId.push(address._id));

      CarShop
      .find({'location': { 
        $in: addressId
      }
      })
      .populate({
        path: 'carShopOwner',
        select: 'firstName lastName', 
        model: 'CarShopOwner'
      })
      .populate({
        path: 'carShopPhone',
        select: 'phone',
        model: 'Phone'
      })
      .populate({
        path: 'location', 
        select: 'address',
        model: 'Address'
      })
      .then(carshop => res.json(carshop))
       .catch(err => res.json('no carshops found.'));
    });
  
  }else if(zipcode) {

    console.log('zipcode is present, now searching.');

    Address
    .find({
      'address.zipcode': zipcode
    })
    .select('_id')
    .then(addresses => {

      const addressId = [];

      addresses.forEach(address => addressId.push(address._id));

      CarShop
      .find({'location': { 
        $in: addressId
      }
      })
      .populate({
        path: 'carShopOwner',
        select: 'firstName lastName', 
        model: 'CarShopOwner'
      })
      .populate({
        path: 'carShopPhone',
        select: 'phone',
        model: 'Phone'
      })
      .populate({
        path: 'location', 
        select: 'address',
        model: 'Address'
      })
      .then(carshop => res.json(carshop))
       .catch(err => res.json('no carshops found.'));

    });

  }else {

    console.log('Please input city and state fields or a zipcode.');
    res.json('Please input the city and state or the zipcode to search for car shops.');
  
  }
};

const getSpecificCarShop = (req, res) => {

  CarShop
  .findById(req.params.id)
  .populate({
    path: 'carShopOwner',
    select: 'firstName lastName', 
    model: 'CarShopOwner'
  })
  .populate({
    path: 'carShopPhone',
    select: 'phone',
    model: 'Phone'
  })
  .populate({
    path: 'location', 
    select: 'address',
    model: 'Address'
  })
  .then(carShop => {
    res.json(carShop);
  })
  .catch(err => res.json('could not find the carshop.'));

};

const addCarShop = (req, res) => {

    CarShop
    .create(req.body)
    .then(carshop => {
      CarShopOwner
      .findByIdAndUpdate(req.body.carShopOwner, {'carShopInfo': carshop._id})
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
  .then(carShop => {

    CarShopOwner
    .findByIdAndUpdate(carShop.carShopOwner._id, {
      $unset: { 
        carShopInfo: ""
      }
    })
    .then(owner => console.log('car shop has been removed to the car shop owner.'))
    .catch(err => console.log('failed to remove car shop from car shop owner.'));

    Address
    .findByIdAndDelete(carShop.location._id)
    .then(address => console.log('address removed.'))
    .catch(err => console.log('failed to remove address from collection.'));

    Phone
    .findByIdAndDelete(carShop.carShopPhone._id)
    .then(phone => console.log('phone has been removed.'))
    .catch(err => console.log('failed to remove phone from collection.'));

    res.json('car shop has been removed.');

  })
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