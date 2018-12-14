import express from 'express';
import {
  jwtAuthenticate
} from '../../../middleware/passportMiddleware';
import {
  getAllAddresses,
  getAddressById,
  addAddress,
  updateAddress,
  removeAddress
} from './controller';

const addressRouter = express.Router();

addressRouter.route('/')
.get(jwtAuthenticate, getAllAddresses)
.post(jwtAuthenticate, addAddress);

addressRouter.route('/:id')
.get(jwtAuthenticate, getAddressById)
.put(jwtAuthenticate, updateAddress)
.delete(jwtAuthenticate, removeAddress);

export default addressRouter;
