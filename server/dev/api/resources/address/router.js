import express from 'express';
import {
  getAllAddresses,
  getAddressById,
  addAddress,
  updateAddress,
  removeAddress
} from './controller';

const addressRouter = express.Router();

addressRouter.route('/')
.get(getAllAddresses)
.post(addAddress);

addressRouter.route('/:id')
.get(getAddressById)
.put(updateAddress)
.delete(removeAddress);

export default addressRouter;
