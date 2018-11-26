import express from 'express';
import mongoose from 'mongoose';
import { localDb } from './config/config';
import carShopRouter from './api/resources/carShop/router';
import carShopOwnerRouter from './api/resources/carShopOwner/router';
import messagingRouter from './api/resources/messaging/router';
import phoneRouter from './api/resources/phone/router';
import address from './api/resources/address/router';

const app = express();

mongoose.connect(localDb, (err) => {
  console.log('local database is connected.');
});

app.use(express.json());
app.use(express.static('public'));
app.use('/api/carshop', carShopRouter);
app.use('/api/carshopowner', carShopOwnerRouter);
app.use('/api/message', messagingRouter);
app.use('/api/phone', phoneRouter);
app.use('/api/address', address);

app.listen(8080, () => console.log('application connected to port 8080.'));

export {
  app
};
