import express from 'express';
import {
  getAllPhoneNumbers,
  getPhoneNumber,
  addPhoneNumber,
  updatePhoneNumber,
  removePhoneNumber
} from './controller';

const phoneRouter = express.Router();

phoneRouter.route('/')
.get(getAllPhoneNumbers)
.post(addPhoneNumber);

phoneRouter.route('/:id')
.get(getPhoneNumber)
.put(updatePhoneNumber)
.delete(removePhoneNumber);

export default phoneRouter;
