"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeCarShop = exports.updateCarShopInfo = exports.addCarShop = exports.getSpecificCarShop = exports.getCarShops = exports.getAllCarShopsForTest = void 0;

var _model = require("./model");

var _model2 = require("../carShopOwner/model");

var _model3 = require("../address/model");

var _model4 = require("../phone/model");

var getAllCarShopsForTest = function getAllCarShopsForTest(req, res) {
  _model.CarShop.find().populate({
    path: 'carShopOwner',
    select: 'firstName lastName',
    model: 'CarShopOwner'
  }).populate({
    path: 'carShopPhone',
    select: 'phone',
    model: 'Phone'
  }).populate({
    path: 'location',
    select: 'address',
    model: 'Address'
  }).then(function (carShops) {
    return res.json(carShops);
  }).catch(function (err) {
    res.status(400).json('no carshops found.');
  });
};

exports.getAllCarShopsForTest = getAllCarShopsForTest;

var getCarShops = function getCarShops(req, res) {
  var _req$query = req.query,
      city = _req$query.city,
      state = _req$query.state,
      zipcode = _req$query.zipcode;

  if (city && state && !zipcode) {
    console.log('city and state is present, now searching.');

    _model3.Address.find({
      'address.city': {
        $regex: city,
        $options: 'i'
      },
      'address.state': {
        $regex: state,
        $options: 'i'
      }
    }).select('_id').then(function (addresses) {
      var addressId = [];
      addresses.forEach(function (address) {
        return addressId.push(address._id);
      });

      _model.CarShop.find({
        'location': {
          $in: addressId
        }
      }).populate({
        path: 'carShopOwner',
        select: 'firstName lastName',
        model: 'CarShopOwner'
      }).populate({
        path: 'carShopPhone',
        select: 'phone',
        model: 'Phone'
      }).populate({
        path: 'location',
        select: 'address',
        model: 'Address'
      }).then(function (carshop) {
        return res.json(carshop);
      }).catch(function (err) {
        return res.status(400).json('no carshops found.');
      });
    });
  } else if (zipcode) {
    console.log('zipcode is present, now searching.');

    _model3.Address.find({
      'address.zipcode': {
        $regex: zipcode,
        $options: 'i'
      }
    }).select('_id').then(function (addresses) {
      var addressId = [];
      addresses.forEach(function (address) {
        return addressId.push(address._id);
      });

      _model.CarShop.find({
        'location': {
          $in: addressId
        }
      }).populate({
        path: 'carShopOwner',
        select: 'firstName lastName',
        model: 'CarShopOwner'
      }).populate({
        path: 'carShopPhone',
        select: 'phone',
        model: 'Phone'
      }).populate({
        path: 'location',
        select: 'address',
        model: 'Address'
      }).then(function (carshop) {
        return res.json(carshop);
      }).catch(function (err) {
        return res.status(400).json('no carshops found.');
      });
    });
  } else {
    console.log('Please input city and state fields or a zipcode.');
    res.json('Please input the city and state or the zipcode to search for car shops.');
  }
};

exports.getCarShops = getCarShops;

var getSpecificCarShop = function getSpecificCarShop(req, res) {
  _model.CarShop.findById(req.params.id).populate({
    path: 'carShopOwner',
    select: 'firstName lastName',
    model: 'CarShopOwner'
  }).populate({
    path: 'carShopPhone',
    select: 'phone',
    model: 'Phone'
  }).populate({
    path: 'location',
    select: 'address',
    model: 'Address'
  }).then(function (carShop) {
    res.json(carShop);
  }).catch(function (err) {
    return res.status(400).json('could not find the carshop.');
  });
};

exports.getSpecificCarShop = getSpecificCarShop;

var addCarShop = function addCarShop(req, res) {
  _model.CarShop.create(req.body).then(function (carshop) {
    _model2.CarShopOwner.findByIdAndUpdate(req.body.carShopOwner, {
      'carShopInfo': carshop._id
    }).then(function (owner) {
      return res.json(owner);
    }).catch(function (err) {
      return res.json('could not find car owner.');
    });
  }).catch(function (err) {
    return res.status(400).json(err);
  });
};

exports.addCarShop = addCarShop;

var updateCarShopInfo = function updateCarShopInfo(req, res) {
  _model.CarShop.findByIdAndUpdate(req.params.id, req.body).then(function (updatedInfo) {
    return res.json(updatedInfo);
  }).catch(function (err) {
    return res.status(400).json('could not update your info.');
  });
};

exports.updateCarShopInfo = updateCarShopInfo;

var removeCarShop = function removeCarShop(req, res) {
  _model.CarShop.findByIdAndDelete(req.params.id).then(function (carShop) {
    _model2.CarShopOwner.findByIdAndUpdate(carShop.carShopOwner._id, {
      $unset: {
        carShopInfo: ""
      }
    }).then(function (owner) {
      return console.log('car shop has been removed to the car shop owner.');
    }).catch(function (err) {
      return console.log('failed to remove car shop from car shop owner.');
    });

    _model3.Address.findByIdAndDelete(carShop.location._id).then(function (address) {
      return console.log('address removed.');
    }).catch(function (err) {
      return console.log('failed to remove address from collection.');
    });

    _model4.Phone.findByIdAndDelete(carShop.carShopPhone._id).then(function (phone) {
      return console.log('phone has been removed.');
    }).catch(function (err) {
      return console.log('failed to remove phone from collection.');
    });

    res.json('car shop has been removed.');
  }).catch(function (err) {
    return res.status(400).json('could not remove your carshop from list.');
  });
};

exports.removeCarShop = removeCarShop;