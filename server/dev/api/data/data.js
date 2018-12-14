import mongoose from 'mongoose';
import faker from 'faker';

import { CarShopOwner } from '../resources/carShopOwner/model';
import { Client } from '../resources/client/model';
import { Message } from '../resources/messaging/model';
import { Address } from '../resources/address/model';
import { Phone } from '../resources/phone/model';
import { CarShop } from '../resources/carShop/model';

const removeDocuments = (Collection) => {

  Collection
  .remove({}, (err) => {
    if(err) {
      console.log(err)
    } else {
      console.log('removed all documents')
    }
  })
  .catch(err => console.log(err));

};

const createFakeDocs = () => {

  for(let i = 0; i < 10 ; i++) {

    let carShopOwnerDoc = new CarShopOwner({

      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: `${faker.lorem.slug()}@email.com`,
      password: 'password123'

    });

    let clientDoc = new Client({

      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: `${faker.lorem.slug()}@email.com`,
      password: "password123"

    });

    let addressDoc = new Address({
      
      address: {
        streetAddress: faker.address.streetAddress(),
        city: faker.address.state(),
        state: faker.address.stateAbbr(),
        zipcode: faker.address.zipCode()
      }

    });

    let phoneDoc = new Phone({

      phone: faker.phone.phoneNumberFormat()

    });

    let carShopDoc = new CarShop({

      shopName: faker.lorem.words(),
      carShopOwner: carShopOwnerDoc._id,
      shopEmail: `${faker.lorem.slug()}@email.com`,
      carShopPhone: phoneDoc._id,
      location: addressDoc._id,
      specialties: [{
        repair: 'Autobody Repair',
        description: [
          'Dent repair',
          'Paintless Den repair'
          ]
      }],
      labor: '20/hr'

    });

    let messageDocs1 = new Message({

      subject: "Client to CarShop",
      message: "Client to CarShop",
      sender: {
        
        client: clientDoc._id
        
      },
      receiver: {
        
        carShop: carShopOwnerDoc._id
    
      }

    });

    let messageDocs2 = new Message({

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

removeDocuments(CarShopOwner);
removeDocuments(Client);
removeDocuments(Address);
removeDocuments(Phone);
removeDocuments(CarShop);
removeDocuments(Message);

export default createFakeDocs;