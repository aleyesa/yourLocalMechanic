import express from 'express';
import {
  jwtAuthenticate
} from '../../../middleware/passportMiddleware';
import {
  getAllPhoneNumbers,
  getPhoneNumber,
  addPhoneNumber,
  updatePhoneNumber,
  removePhoneNumber
} from './controller';

const phoneRouter = express.Router();

phoneRouter.route('/')
.get(jwtAuthenticate, getAllPhoneNumbers)
.post(jwtAuthenticate, addPhoneNumber);

phoneRouter.route('/:id')
.get(jwtAuthenticate, getPhoneNumber)
.put(jwtAuthenticate, updatePhoneNumber)
.delete(jwtAuthenticate, removePhoneNumber);

export default phoneRouter;
