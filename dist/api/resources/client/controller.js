"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteClient = exports.updateClient = exports.createClient = exports.getClientInfo = exports.getAllClients = void 0;

var _model = require("./model");

var getAllClients = function getAllClients(req, res) {
  _model.Client.find().then(function (clients) {
    res.json(clients);
  }).catch(function (err) {
    return res.json(err);
  });
};

exports.getAllClients = getAllClients;

var getClientInfo = function getClientInfo(req, res) {
  _model.Client.findById(req.params.id).populate({
    path: 'messageBox',
    model: 'Message',
    options: {
      sort: {
        'timestamp': 1
      }
    }
  }).then(function (client) {
    return res.json(client);
  }).catch(function (err) {
    return res.json(err);
  });
};

exports.getClientInfo = getClientInfo;

var createClient = function createClient(req, res) {
  _model.Client.create(req.body).then(function (client) {
    return res.json("The user ".concat(client.username, " has been created."));
  }).catch(function (err) {
    return res.json(err);
  });
};

exports.createClient = createClient;

var updateClient = function updateClient(req, res) {
  _model.Client.findByIdAndUpdate(req.params.id, req.body).then(function (client) {
    return res.json(client);
  }).catch(function (err) {
    return res.json(err);
  });
};

exports.updateClient = updateClient;

var deleteClient = function deleteClient(req, res) {
  _model.Client.findOneAndDelete(req.params.id).then(function (client) {
    return res.json("The user ".concat(client.username, " has been deleted."));
  }).catch(function (err) {
    return res.json(err);
  });
};

exports.deleteClient = deleteClient;