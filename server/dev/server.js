'use strict';
import express from 'express';
import mongoose from 'mongoose';
import { 
  PRODUCTION_DATABASE,
  TEST_DATABASE,
  PORT
} from './config/config';
import api from './api/api';
import appMiddleware from './middleware/appMiddleware';
// import createFakeDocs from './api/data/data';

const app = express();
let server;

//fix deprecation warning
mongoose.set('useCreateIndex', true);

appMiddleware(app, express);
api(app);

if (require.main === module) {

  mongoose
  .connect(PRODUCTION_DATABASE || TEST_DATABASE, 
  { useNewUrlParser: true }, err => {
    console.log('db connected.');
    // createFakeDocs();
    if (err) {
      return console.log(err);
    }
    server = app.listen(PORT, (port = PORT) => {
      console.log(`Your app is listening on port ${port}`);
    })
    .on('error', err => {
      mongoose.disconnect();
      console.log(err);
    });
  });
  
}

export default app;
