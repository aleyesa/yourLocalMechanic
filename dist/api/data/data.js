"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _faker = _interopRequireDefault(require("faker"));

var _model = require("../resources/carShopOwner/model");

var _model2 = require("../resources/client/model");

var _model3 = require("../resources/messaging/model");

var _model4 = require("../resources/address/model");

var _model5 = require("../resources/phone/model");

var _model6 = require("../resources/carShop/model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createFakeDocs = function createFakeDocs() {
  for (var i = 0; i < 10; i++) {
    var carShopOwnerDoc = new _model.CarShopOwner({
      firstName: _faker.default.name.firstName(),
      lastName: _faker.default.name.lastName(),
      username: "".concat(_faker.default.lorem.slug(), "@email.com"),
      password: 'password123'
    });
    var clientDoc = new _model2.Client({
      firstName: _faker.default.name.firstName(),
      lastName: _faker.default.name.lastName(),
      username: "".concat(_faker.default.lorem.slug(), "@email.com"),
      password: "password123"
    });
    var addressDoc = new _model4.Address({
      address: {
        streetAddress: _faker.default.address.streetAddress(),
        city: _faker.default.address.state(),
        state: _faker.default.address.stateAbbr(),
        zipcode: _faker.default.address.zipCode()
      }
    });
    var phoneDoc = new _model5.Phone({
      phone: _faker.default.phone.phoneNumberFormat()
    });
    var carShopDoc = new _model6.CarShop({
      shopName: _faker.default.lorem.words(),
      carShopOwner: carShopOwnerDoc._id,
      shopEmail: "".concat(_faker.default.lorem.slug(), "@email.com"),
      carShopPhone: phoneDoc._id,
      location: addressDoc._id,
      specialties: [{
        repair: 'Autobody Repair',
        description: ['Dent repair', 'Paintless Den repair']
      }],
      labor: '20/hr'
    });
    var messageDocs1 = new _model3.Message({
      subject: "Client to CarShop",
      message: "Client to CarShop",
      sender: {
        client: clientDoc._id
      },
      receiver: {
        carShop: carShopOwnerDoc._id
      }
    });
    var messageDocs2 = new _model3.Message({
      subject: "CarShop to Client",
      message: "CarShop to Client",
      sender: {
        carShop: carShopOwnerDoc._id
      },
      receiver: {
        client: clientDoc._id
      }
    });
    addressDoc.save();
    phoneDoc.save();
    carShopDoc.save();
    messageDocs1.save();
    messageDocs2.save();
    carShopOwnerDoc.carShopInfo = carShopDoc._id;
    carShopOwnerDoc.clientMessages = [clientDoc._id];
    carShopOwnerDoc.save();
    clientDoc.carShopMessages = [carShopOwnerDoc._id];
    clientDoc.save();
  }
};

_mongoose.default.connection.dropDatabase();

var _default = createFakeDocs;
exports.default = _default;