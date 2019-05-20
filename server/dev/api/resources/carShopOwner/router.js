import express from 'express';
import {
  jwtAuthenticate
} from '../../../middleware/passportMiddleware';
import {
  getAllCarShopOwner,
  getCarShopOwnerInfo,
  createAccount,
  updateCarShopOwnerInfo,
  deleteCarShopOwnerAccount,

  comparePWTester
} from './controller';

const carShopOwnerRouter = express.Router();

carShopOwnerRouter.route('/')
.get(jwtAuthenticate, getAllCarShopOwner)
.get(getAllCarShopOwner)
.post(createAccount);

carShopOwnerRouter.route('/tester')
.get(comparePWTester);

carShopOwnerRouter.route('/:id')
.get(jwtAuthenticate, getCarShopOwnerInfo)
.put(jwtAuthenticate, updateCarShopOwnerInfo)
.delete(jwtAuthenticate, deleteCarShopOwnerAccount);


export default carShopOwnerRouter;