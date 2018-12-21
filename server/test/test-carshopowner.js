'use strict';
import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import mongoose  from 'mongoose';
import { 
  TEST_DATABASE,
  PORT
} from '../dev/config/config';
import api from '../dev/api/api';
import appMiddleware from '../dev/middleware/appMiddleware';

chai.use(chaiHttp);

const app = express();

const appConnection = chai.request(app.listen(PORT));
const mongooseConnect = mongoose.connect(TEST_DATABASE, { useNewUrlParser: true });
const expect = chai.expect;

const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjYXJTaG9wMUBlbWFpbC5jb20iLCJpYXQiOjE1NDQ3MzYzNDcsImV4cCI6MTU0NTM0MTE0Nywic3ViIjoiY2FyU2hvcDFAZW1haWwuY29tIn0.u9RZkMrdMJoXZPTITtj_J7FrHDsPERXjCF1uIxqioCs';

mongoose.set('useCreateIndex', true);
mongooseConnect;
appMiddleware(app, express);
api(app);


describe('Your Local Car Shop', () => {

  describe('Car shop owner crud application:', function() {

    it('Get all car shop owner request', function() {
      return appConnection
      .get('/api/carshopowner')
      // .set('Authorization',  `bearer ${bearerToken}`)
      .then(res => {
        expect(res).to.have.status(200);
        console.log(res.body);
      
        mongoose.disconnect(console.log('db disconnected'));
        appConnection.close(console.log('app disconnected.'));

      })
      .catch(err => {
        expect(err.status).to.have.status(400);
      });

      


    });

    // it('Get currently logged in car shop owner', () => {

    //   appConnection.get('/api/carshopowner/5c12b4a02e6fe40a20adf741')
    //   .set('Authorization', `bearer ${bearerToken}`)
    //   .then((res) => {
    //     expect(res).to.have.status(200);
    //     appConnection.close();
    //     mongoose.disconnect();
    //   });    

    // });

    // it('Create car shop owner', () => {

    //   appConnection.post('/api/carshopowner')
    //   .set('Content-Type', 'application/json')
    //   .send({
    //     firstName: 'firstName3',
    //     lastName: 'lastName2',
    //     username: 'carShop3@email.com',
    //     password: 'password123'
    //   })
    //   .then((res) => {
    //     expect(res).to.have.status(201);
    //     appConnection.close();
    //     mongoose.disconnect();
    //   });    

    // });

    // it('Remove car shop owner', () => {

    //   appConnection.del('/api/carshopowner/5c12b4a02e6fe40a20adf779')
    //   .set('Authorization', `bearer ${bearerToken}`)
    //   .then((res) => {
    //     expect(res).to.have.status(200);
    //     appConnection.close();
    //     mongoose.disconnect();
    //   });    

    // });

    // it('Update car shop owner', () => {

    //   appConnection.put('/api/carshopowner/5c130808c99bb73508b6bc5e')
    //   .set('Authorization', `bearer ${bearerToken}`)
    //   .send({
    //     firstName: 'firstName6',
    //     lastName: 'lastName6',
    //     username: 'carShop6@email.com'
    //   })
    //   .then((res) => {
    //     expect(res).to.have.status(200);
    //     appConnection.close();
    //     mongoose.disconnect();
    //   });    

    // });
  })

  // describe('Client crud applications:', () => {

  //   it('Get clients request', () => {

  //     appConnection.get('/api/client')
  //     .set('Authorization', `bearer ${bearerToken}`)
  //     .then((res) => {
  //       expect(res).to.have.status(200);
  //       appConnection.close();
  //       mongoose.disconnect();
  //     });

  //   });

  //   it('Get currently logged in client', () => {

  //     appConnection.get('/api/client/5c12b7c413109d04089535ef')
  //     .set('Authorization', `bearer ${bearerToken}`)
  //     .then((res) => {
  //       expect(res).to.have.status(200);
  //       appConnection.close();
  //       mongoose.disconnect();
  //     });

  //   });

  //   it('Create client', () => {

  //     appConnection.post('/api/carshopowner')
  //     .set('Content-Type', 'application/json')
  //     .send({
  //       firstName: 'firstName8',
  //       lastName: 'lastName8',
  //       username: 'client8@email.com',
  //       password: 'password123'
  //     })
  //     .then((res) => {
  //       expect(res).to.have.status(201);
  //       appConnection.close();
  //       mongoose.disconnect();
  //     });    

  //   });

  //   it('Remove client', () => {

  //     appConnection.del('/api/carshopowner/5c12b7c413109d04089535ef')
  //     .set('Authorization', `bearer ${bearerToken}`)
  //     .then((res) => {
  //       expect(res).to.have.status(200);
  //       appConnection.close();
  //       mongoose.disconnect();
  //     });    

  //   });

  //   it('Update client', () => {

  //     appConnection.put('/api/carshopowner/5c12b4a02e6fe40a20adf75a')
  //     .set('Authorization', `bearer ${bearerToken}`)
  //     .send({
  //       firstName: 'newfirstName6',
  //       lastName: 'newlastName6',
  //       username: 'newclient6@email.com'
  //     })
  //     .then((res) => {
  //       expect(res).to.have.status(200);
  //       appConnection.close();
  //       mongoose.disconnect();
  //     });    

  //   });
    
  // });

  // describe('Messaging crud applications:', () => {

  // it('Get all messages', () => {

  //   appConnection.get('/api/message')
  //   .set('Authorization', `bearer ${bearerToken}`)
  //   .then((res) => {
  //     expect(res).to.have.status(200);
  //     appConnection.close();
  //     mongoose.disconnect();
  //   });

  // });

  // it('Get thread between a client and a carshop', () => {

  //   appConnection.get('/api/client')
  //   .set('Authorization', `bearer ${bearerToken}`)
  //   .query({
  //     carShop: '5c12b4a02e6fe40a20adf731',
  //     client: '5c12b4a02e6fe40a20adf732'
  //   })
  //   .then((res) => {
  //     expect(res).to.have.status(200);
  //     appConnection.close();
  //     mongoose.disconnect();
  //   });

  // });

  // it('Create message', () => {

  //   appConnection.post('/api/message')
  //   .set('Content-Type', 'application/json')
  //   .set('Authorization', `bearer ${bearerToken}`)
  //   .send({
  //     subject: 'Client to CarShop4',
  //     message: 'Client to CarShop4',
  //     sender: {
        
  //       client: '5c12b4a02e6fe40a20adf732'
        
  //     },
  //     receiver: {
        
  //       carShop: '5c12b4a02e6fe40a20adf731'
    
  //     }
  //   })
  //   .then((res) => {
  //     expect(res).to.have.status(200);
  //     appConnection.close();
  //     mongoose.disconnect();
  //   });    

  // });

  // it('Edit message', () => {

  //   appConnection.put('/api/message/5c12b4a02e6fe40a20adf737')
  //   .set('Content-Type', 'application/json')
  //   .set('Authorization', `bearer ${bearerToken}`)
  //   .send({
  //     "message": "Edited client to carshop 6"
  //   })
  //   .then((res) => {
  //     expect(res).to.have.status(200);
  //     appConnection.close();
  //     mongoose.disconnect();
  //   });
  // });    

  //   it('Remove a message', () => {

  //     appConnection.del('/api/message/5c1316e4dc4b7228e8b8bf7e')
  //     .set('Authorization', `bearer ${bearerToken}`)
  //     .then((res) => {
  //       expect(res).to.have.status(200);
  //       appConnection.close();
  //       mongoose.disconnect();
  //     });    
  
  //   });

  //   it('Remove message thread', () => {

  //     appConnection.del('/api/message/thread')
  //     .set('Authorization', `bearer ${bearerToken}`)
  //     .query({
  //       client: '5c12b4a02e6fe40a20adf76a',
  //       carShop: '5c12b4a02e6fe40a20adf769'
  //     })
  //     .then((res) => {
  //       expect(res).to.have.status(200);
  //       appConnection.close();
  //       mongoose.disconnect();
  //     });  
  
  //   });

  // });

  //   describe('Phone crud applications:', () => {

  //   it('Get all phone numbers.', () => {

  //     appConnection.get('/api/phone')
  //     .set('Authorization', `bearer ${bearerToken}`)
  //     .then((res) => {
  //       expect(res).to.have.status(200);
  //       appConnection.close();
  //       mongoose.disconnect();
  //     });

  //   });

  //   it('Get a phone number.', () => {

  //     appConnection.get('/api/phone/5c12b4a02e6fe40a20adf734')
  //     .set('Authorization', `bearer ${bearerToken}`)
  //     .then((res) => {
  //       expect(res).to.have.status(200);
  //       appConnection.close();
  //       mongoose.disconnect();
  //     });

  //   });

  //   it('Create phone number.', () => {

  //     appConnection.post('/api/phone')
  //     .set('Authorization', `bearer ${bearerToken}`)
  //     .set('Content-Type', 'application/json')
  //     .send({
  //       phone: '111-222-3333'
  //     })
  //     .then((res) => {
  //       expect(res).to.have.status(200);
  //       appConnection.close();
  //       mongoose.disconnect();
  //     });    

  //   });

  //   it('Update phone number.', () => {

  //     appConnection.put('/api/phone/5c12b4a02e6fe40a20adf734')
  //     .set('Authorization', `bearer ${bearerToken}`)
  //     .set('Content-Type', 'application/json')
  //     .send({
  //       phone: '333-222-1111'
  //     })
  //     .then((res) => {
  //       expect(res).to.have.status(200);
  //       appConnection.close();
  //       mongoose.disconnect();
  //     }); 
  //   });  

  //   it('Remove phone number.', () => {

  //     appConnection.del('/api/phone/5c131fcada112314b4c6297d')
  //     .set('Authorization', `bearer ${bearerToken}`)
  //     .set('Content-Type', 'application/json')
  //     .then((res) => {
  //       expect(res).to.have.status(200);
  //       appConnection.close();
  //       mongoose.disconnect();
  //     });    

  //   });
  //   });

  

  // describe('Address crud applications:', () => {

  //   it('Get all addresses.', () => {

  //     appConnection.get('/api/address')
  //     .set('Authorization', `bearer ${bearerToken}`)
  //     .then((res) => {
  //       expect(res).to.have.status(200);
  //       appConnection.close();
  //       mongoose.disconnect();
  //     });

  //   });

  //   it('Get an address.', () => {

  //     appConnection.get('/api/address/5c12b4a02e6fe40a20adf733')
  //     .set('Authorization', `bearer ${bearerToken}`)
  //     .then((res) => {
  //       expect(res).to.have.status(200);
  //       appConnection.close();
  //       mongoose.disconnect();
  //     });

  //   });

  //   it('Create address.', () => {

  //     appConnection.post('/api/address')
  //     .set('Authorization', `bearer ${bearerToken}`)
  //     .set('Content-Type', 'application/json')
  //     .send({
  //       address: {
  //         streetAddress: '3333 streetName3',
  //         city: 'Gilbert',
  //         state: 'AZ',
  //         zipcode: '85298'
  //       }
  //     })
  //     .then((res) => {
  //       expect(res).to.have.status(200);
  //       appConnection.close();
  //       mongoose.disconnect();
  //     });    

  //   });

  //   it('Update address.', () => {

  //     appConnection.put('/api/address/5c12b4a02e6fe40a20adf733')
  //     .set('Authorization', `bearer ${bearerToken}`)
  //     .set('Content-Type', 'application/json')
  //     .send({
  //       address: {
  //         streetAddress: '1234 streetName1',
  //         city: 'Gilbert',
  //         state: 'AZ',
  //         zipcode: '85298'
  //       }
  //     })
  //     .then((res) => {
  //       expect(res).to.have.status(200);
  //       appConnection.close();
  //       mongoose.disconnect();
  //     });
  //   });


  //   it('Remove address.', () => {

  //     appConnection.del('/api/address/5c12b4a02e6fe40a20adf77b')
  //     .set('Authorization', `bearer ${bearerToken}`)
  //     .set('Content-Type', 'application/json')
  //     .then((res) => {
  //       expect(res).to.have.status(200);
  //       appConnection.close();
  //       mongoose.disconnect();
  //     });    

  //   });
  // });

  // describe('Car shop crud application', () => {

  //     it('Get all car shops.', () => {
  
  //       appConnection.get('/api/carshop/all')
  //       .then((res) => {
  //         expect(res).to.have.status(200);
  //         appConnection.close();
  //         mongoose.disconnect();
  //       });
  
  //     });
  
  //     it('Get car shop by location', () => {
  
  //       appConnection.get('/api/carshop')
  //       .query({
  //         zipcode: '85298'
  //       })
  //       .then((res) => {
  //         expect(res).to.have.status(200);
  //         appConnection.close();
  //         mongoose.disconnect();
  //       });
  
  //     });

  //     it('Get car shop by id', () => {
  
  //       appConnection.get('/api/carshop/5c12b4a02e6fe40a20adf735')
  //       .then((res) => {
  //         expect(res).to.have.status(200);
  //         appConnection.close();
  //         mongoose.disconnect();
  //       });
  
  //     });
  
  //     it('Create address.', () => {
  
  //       appConnection.post('/api/carshop')
  //       .set('Authorization', `bearer ${bearerToken}`)
  //       .set('Content-Type', 'application/json')
  //       .send({
  //         shopName: 'carShop1',
  //         carShopOwner: '5c13118fcad48b0d58917b2e',
  //         shopEmail: 'carShop1@email.com',
  //         carShopPhone: '5c132010c8c52c28f00774e0',
  //         location: '5c132228d6f1651104991f6c',
  //         specialties: [{
  //           repair: 'Autobody Repair',
  //           description: [
  //             "Dent repair",
  //             'Paintless Den repair'
  //             ]
  //         }],
  //         labor: '20/hr'
  //       })
  //       .then((res) => {
  //         expect(res).to.have.status(200);
  //         appConnection.close();
  //         mongoose.disconnect();
  //       });    
  
  //     });
  
  //     it('Update address.', () => {
  
  //       appConnection.put('/api/carshop/5c12b4a02e6fe40a20adf735')
  //       .set('Authorization', `bearer ${bearerToken}`)
  //       .set('Content-Type', 'application/json')
  //       .send({
  //         shopName: 'newCarShop1'
  //       })
  //       .then((res) => {
  //         expect(res).to.have.status(200);
  //         appConnection.close();
  //         mongoose.disconnect();
  //       });
  //     });

  
  //     it('Remove address.', () => {
  
  //       appConnection.del('/api/carshop/5c12b4a02e6fe40a20adf775')
  //       .set('Authorization', `bearer ${bearerToken}`)
  //       .then((res) => {
  //         expect(res).to.have.status(200);
  //         appConnection.close();
  //         mongoose.disconnect();
  //       });    
  
  //     });

  // });

});
