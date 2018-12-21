"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteConversation = exports.deleteMessage = exports.editMessage = exports.createMessage = exports.getMessageThread = exports.getAllMessages = void 0;

var _model = require("./model");

var _model2 = require("../client/model");

var _model3 = require("../carShopOwner/model");

var getAllMessages = function getAllMessages(req, res) {
  _model.Message.find().populate([{
    path: 'sender.client',
    model: 'Client'
  }, {
    path: 'sender.carShop',
    model: 'CarShopOwner'
  }, {
    path: 'receiver.client',
    model: 'Client'
  }, {
    path: 'receiver.carShop',
    model: 'CarShopOwner'
  }]).sort('timestamp').then(function (messages) {
    return res.json(messages);
  }).catch(function (err) {
    return res.status(400).json(err);
  });
};

exports.getAllMessages = getAllMessages;

var getMessageThread = function getMessageThread(req, res) {
  _model.Message.find().or([{
    "sender.client": req.query.client,
    "receiver.carShop": req.query.carShop
  }, {
    "sender.carShop": req.query.carShop,
    "receiver.client": req.query.client
  }]) // Message
  // .find()
  // .and([
  //   {
  //     "user.client": req.query.client,
  //     "user.carShop": req.query.carShop
  //   }
  // ])
  .populate([{
    path: 'sender.client',
    model: 'Client'
  }, {
    path: 'sender.carShop',
    model: 'CarShopOwner'
  }, {
    path: 'receiver.client',
    model: 'Client'
  }, {
    path: 'receiver.carShop',
    model: 'CarShopOwner'
  }]).sort('timestamp').then(function (messages) {
    if (messages.length == 0) {
      res.json('No conversations were found.');
    } else {
      res.json(messages);
    }
  }).catch(function (err) {
    return res.status(400).json(err);
  });
};

exports.getMessageThread = getMessageThread;

var createMessage = function createMessage(req, res) {
  _model.Message.create(req.body).then(function (message) {
    if (message.sender.client) {
      _model2.Client.findByIdAndUpdate(message.sender.client, {
        $addToSet: {
          carShopMessages: message.receiver.carShop
        }
      }).then(function (client) {
        console.log("car shop added to carShopMessages.");
      }).catch(function (err) {
        return console.log('failed to add car shop to carShopMessages.');
      });

      _model3.CarShopOwner.findByIdAndUpdate(message.receiver.carShop, {
        $addToSet: {
          clientMessages: message.sender.client
        }
      }).then(function (carShop) {
        console.log("client has been added to clientMessages.");
      }).catch(function (err) {
        return console.log('failed to add client to clientMessages.');
      });
    } else {
      _model3.CarShopOwner.findByIdAndUpdate(message.sender.carShop, {
        $addToSet: {
          clientMessages: message.receiver.client
        }
      }).then(function (carShop) {
        console.log("client has been added to clientMessages.");
      }).catch(function (err) {
        return console.log('failed to add client to clientMessages.');
      });

      _model2.Client.findByIdAndUpdate(message.receiver.client, {
        $addToSet: {
          carShopMessages: message.sender.carShop
        }
      }).then(function (message) {
        console.log("carshop has been added to carShopMessages.");
      }).catch(function (err) {
        return console.log('failed to add car shop to carShopMessages.');
      });
    }

    res.json('message was created.');
  }).catch(function (err) {
    return res.status(400).json(err);
  });
};

exports.createMessage = createMessage;

var editMessage = function editMessage(req, res) {
  _model.Message.findByIdAndUpdate(req.params.id, req.body).then(function (editedMessage) {
    return res.json(editedMessage);
  }).catch(function (err) {
    return res.status(400).json('failed to edit message.');
  });
};

exports.editMessage = editMessage;

var deleteMessage = function deleteMessage(req, res) {
  _model.Message.findByIdAndDelete(req.params.id).then(function (message) {
    res.json(message);
  }).catch(function (err) {
    return res.status(400).json('failed to delete message.');
  });
};

exports.deleteMessage = deleteMessage;

var deleteConversation = function deleteConversation(req, res) {
  _model.Message.find().or([{
    "sender.client": req.query.client,
    "receiver.carShop": req.query.carShop
  }, {
    "sender.carShop": req.query.carShop,
    "receiver.client": req.query.client
  }]).deleteMany().then(function (thread) {
    _model2.Client.findByIdAndUpdate(req.query.client, {
      $pull: {
        carShopMessages: req.query.carShop
      }
    }).then(function (client) {
      return console.log("car shop conversation was removed.");
    });

    _model3.CarShopOwner.findByIdAndUpdate(req.query.carShop, {
      $pull: {
        clientMessages: req.query.client
      }
    }).then(function (carShop) {
      return console.log("client conversation was removed.");
    });

    res.json('conversation was deleted.');
  }).catch(function (err) {
    return res.status(400).json('failed to remove conversation.');
  });
};

exports.deleteConversation = deleteConversation;