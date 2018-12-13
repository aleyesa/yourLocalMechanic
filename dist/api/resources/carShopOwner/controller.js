"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCarShopOwnerAccount = exports.updateCarShopOwnerInfo = exports.createAccount = exports.getCarShopOwnerInfo = exports.getAllCarShopOwner = void 0;

var _model = require("./model");

var getAllCarShopOwner = function getAllCarShopOwner(req, res) {
  _model.CarShopOwner.find().populate({
    path: 'clientMessages',
    select: 'firstName lastName',
    model: 'Client'
  }).populate({
    path: 'carShopInfo',
    select: 'shopName',
    model: 'CarShop'
  }).then(function (owner) {
    return res.json(owner);
  }).catch(function (err) {
    return res.json('could not find any car shop owners.');
  });
};

exports.getAllCarShopOwner = getAllCarShopOwner;

var getCarShopOwnerInfo = function getCarShopOwnerInfo(req, res) {
  _model.CarShopOwner.findById(req.params.id).populate({
    path: 'messageBox',
    model: 'Message',
    options: {
      sort: {
        'timestamp': 1
      }
    }
  }).populate({
    path: 'carShopInfo',
    model: 'CarShop',
    populate: [{
      path: 'carShopPhone',
      model: 'Phone'
    }, {
      path: 'location',
      model: 'Address'
    }]
  }).then(function (ownerInfo) {
    res.json(ownerInfo);
  }).catch(function (err) {
    return res.json('could not find any car shop owners.');
  });
};

exports.getCarShopOwnerInfo = getCarShopOwnerInfo;

var createAccount = function createAccount(req, res) {
  _model.CarShopOwner.create(req.body).then(function (owner) {
    res.json(owner);
  }).catch(function (err) {
    res.json({
      message: 'could not create account.',
      err: err
    });
  });
};

exports.createAccount = createAccount;

var updateCarShopOwnerInfo = function updateCarShopOwnerInfo(req, res) {
  _model.CarShopOwner.findByIdAndUpdate(req.params.id, req.body).then(function (updatedInfo) {
    return res.json(updatedInfo);
  }).catch(function (err) {
    return res.json('failed to update info.');
  });
};

exports.updateCarShopOwnerInfo = updateCarShopOwnerInfo;

var deleteCarShopOwnerAccount = function deleteCarShopOwnerAccount(req, res) {
  _model.CarShopOwner.findByIdAndDelete(req.params.id).then(function (account) {
    return res.json('Car shop owner has been removed.');
  }).catch(function (err) {
    return res.json('failed to delete account.');
  });
};

exports.deleteCarShopOwnerAccount = deleteCarShopOwnerAccount;