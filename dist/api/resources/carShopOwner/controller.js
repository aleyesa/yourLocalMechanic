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
    res.json(owner);
  }).catch(function (err) {
    return res.status(400).json('could not find any car shop owners.');
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
    return res.status(400).json('could not find any car shop owners.');
  });
};

exports.getCarShopOwnerInfo = getCarShopOwnerInfo;

var createAccount = function createAccount(req, res) {
  var requiredFields = ['username', 'password'];
  var missingField = requiredFields.find(function (field) {
    return !(field in req.body);
  }); //check if username and password values are strings

  if (!missingField) {
    if (typeof req.body.username === 'string' && typeof req.body.password === 'string') {
      req.body.username = req.body.username.trim();

      _model.CarShopOwner.find({
        username: req.body.username
      }).then(function (user) {
        if (!user) {
          console.log("The user '".concat(user.username, " has already been taken."));
          res.json('username already taken.');
        } else {
          if (req.body.password !== req.body.password.trim()) {
            console.log('no spaces allowed in the beginning or end of password.');
            res.json('no spaces allowed in the beginning or end of password.');
          } else {
            if (req.body.password.length < 8) {
              console.log('Password needs to be at least 8 characters long.');
              res.json('Password needs to be at least 8 characters long.');
            } else {
              _model.CarShopOwner.hashPassword(req.body.password).then(function (pw) {
                req.body.password = pw;

                _model.CarShopOwner.create(req.body).then(function (user) {
                  return res.status(201).json("".concat(user.username, " has been created."));
                });
              }).catch(function (err) {
                return console.log("failed to create user. \n ".concat(err.message, " "));
              });
            }
          }
        }
      }).catch(function (err) {
        return res.json('failed to create account.');
      });
    } else {
      console.log('username or password is not a string value.');
      res.status(400).json('username or password is not a string value.');
    }
  } else {
    console.log("".concat(missingField, " field is missing."));
    res.status(400).json("".concat(missingField, " field is missing."));
  }
};

exports.createAccount = createAccount;

var updateCarShopOwnerInfo = function updateCarShopOwnerInfo(req, res) {
  _model.CarShopOwner.findByIdAndUpdate(req.params.id, req.body).then(function (updatedInfo) {
    return res.json(updatedInfo);
  }).catch(function (err) {
    return res.status(400).json('failed to update info.');
  });
};

exports.updateCarShopOwnerInfo = updateCarShopOwnerInfo;

var deleteCarShopOwnerAccount = function deleteCarShopOwnerAccount(req, res) {
  _model.CarShopOwner.findByIdAndDelete(req.params.id).then(function (account) {
    return res.json('Car shop owner has been removed.');
  }).catch(function (err) {
    return res.status(400).json('failed to delete account.');
  });
};

exports.deleteCarShopOwnerAccount = deleteCarShopOwnerAccount;