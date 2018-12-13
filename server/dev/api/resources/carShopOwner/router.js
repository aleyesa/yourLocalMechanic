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
.get(getAllCarShopOwner)
.post(createAccount, jwtAuthenticate);

carShopOwnerRouter.route('/:id')
.get(getCarShopOwnerInfo)
.put(updateCarShopOwnerInfo)
.delete(deleteCarShopOwnerAccount);

export default carShopOwnerRouter;