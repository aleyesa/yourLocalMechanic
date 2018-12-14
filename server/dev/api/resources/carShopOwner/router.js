import express from 'express';
import {
  jwtAuthenticate
} from '../../../middleware/passportMiddleware';
import {
  getAllCarShopOwner,
  getCarShopOwnerInfo,
  createAccount,
  updateCarShopOwnerInfo,
  deleteCarShopOwnerAccount
} from './controller';

const carShopOwnerRouter = express.Router();

carShopOwnerRouter.route('/')
.get(jwtAuthenticate, getAllCarShopOwner)
.post(createAccount);

carShopOwnerRouter.route('/:id')
.get(jwtAuthenticate, getCarShopOwnerInfo)
.put(jwtAuthenticate, updateCarShopOwnerInfo)
.delete(jwtAuthenticate, deleteCarShopOwnerAccount);

export default carShopOwnerRouter;