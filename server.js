import express from 'express';
import mongoose from 'mongoose';
import { localDb } from './config/config';
import carShopRouter from './api/resources/carShop/router';

const app = express();

mongoose.connect(localDb, (err) => {
  console.log('local database is connected.');
});

app.use(express.json());
app.use(express.static('public'));
app.use('/api/carshop', carShopRouter);


app.listen(8080, () => console.log('application connected to port 8080.'));

export {
  app
};
