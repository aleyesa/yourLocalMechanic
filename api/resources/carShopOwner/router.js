import express from 'express';
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
.post(createAccount);

carShopOwnerRouter.route('/:id')
.get(getCarShopOwnerInfo)
.put(updateCarShopOwnerInfo)
.delete(deleteCarShopOwnerAccount);

export default carShopOwnerRouter;