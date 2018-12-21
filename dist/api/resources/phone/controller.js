"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removePhoneNumber = exports.updatePhoneNumber = exports.addPhoneNumber = exports.getPhoneNumber = exports.getAllPhoneNumbers = void 0;

var _model = require("./model");

var getAllPhoneNumbers = function getAllPhoneNumbers(req, res) {
  _model.Phone.find().then(function (phoneNumber) {
    return res.json(phoneNumber);
  }).catch(function (err) {
    return res.status(400).json('no phone numbers found.');
  });
};

exports.getAllPhoneNumbers = getAllPhoneNumbers;

var getPhoneNumber = function getPhoneNumber(req, res) {
  _model.Phone.findById(req.params.id).then(function (phoneNumber) {
    return res.json(phoneNumber);
  }).catch(function (err) {
    return res.status(400).json('could not find phone number.');
  });
};

exports.getPhoneNumber = getPhoneNumber;

var addPhoneNumber = function addPhoneNumber(req, res) {
  _model.Phone.create(req.body).then(function (phoneNumber) {
    return res.json(phoneNumber);
  }).catch(function (err) {
    return res.status(400).json('failed to add phone number.');
  });
};

exports.addPhoneNumber = addPhoneNumber;

var updatePhoneNumber = function updatePhoneNumber(req, res) {
  _model.Phone.findByIdAndUpdate(req.params.id, req.body).then(function (phoneNumber) {
    return res.json(phoneNumber);
  }).catch(function (err) {
    return res.status(400).json('failed to update phoneNumber.');
  });
};

exports.updatePhoneNumber = updatePhoneNumber;

var removePhoneNumber = function removePhoneNumber(req, res) {
  _model.Phone.findByIdAndDelete(req.params.id).then(function (phoneNumber) {
    return res.json('The phone Number was deleted');
  }).catch(function (err) {
    return res.status(400).json('failed to remove phone number.');
  });
};

exports.removePhoneNumber = removePhoneNumber;