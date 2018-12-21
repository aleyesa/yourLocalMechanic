"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeAddress = exports.updateAddress = exports.addAddress = exports.getAddressById = exports.getAllAddresses = void 0;

var _model = require("./model");

var getAllAddresses = function getAllAddresses(req, res) {
  _model.Address.find().then(function (address) {
    return res.json(address);
  }).catch(function (err) {
    return res.json('could not find any addresses.');
  });
};

exports.getAllAddresses = getAllAddresses;

var getAddressById = function getAddressById(req, res) {
  _model.Address.findById(req.params.id).then(function (address) {
    return res.json(address);
  }).catch(function (err) {
    return res.status(400).json('could not find specific address.');
  });
};

exports.getAddressById = getAddressById;

var addAddress = function addAddress(req, res) {
  _model.Address.create(req.body).then(function (createdAddress) {
    return res.json(createdAddress);
  }).catch(function (err) {
    return res.status(400).json('failed to add the address.');
  });
};

exports.addAddress = addAddress;

var updateAddress = function updateAddress(req, res) {
  _model.Address.findByIdAndUpdate(req.params.id, req.body).then(function (updatedAddress) {
    return res.json(updatedAddress);
  }).catch(function (err) {
    return res.status(400).json('failed to update address.');
  });
};

exports.updateAddress = updateAddress;

var removeAddress = function removeAddress(req, res) {
  _model.Address.findByIdAndDelete(req.params.id).then(function (removedAddress) {
    return res.json('address has been removed.');
  }).catch(function (err) {
    return res.status(400).json('failed to remove address.');
  });
};

exports.removeAddress = removeAddress;