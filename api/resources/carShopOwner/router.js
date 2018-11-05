import express from 'express';
import {
  getCarShopOwnerInfo,
  createAccount,
  updateCarShopOwnerInfo,
  deleteCarShopOwnerAccount
} from './controller';

const carShopOwnerRouter = express.Router();

carShopOwnerRouter.route('/')
.post(createAccount);

carShopOwnerRouter.route('/:id')
.get(getCarShopOwnerInfo)
.put(updateCarShopOwnerInfo)
.delete(deleteCarShopOwnerAccount);

export default carShopOwnerRouter;