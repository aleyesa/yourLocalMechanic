import express from 'express';
import {
  jwtAuthenticate
} from '../../../middleware/passportMiddleware';
import {
  getAllCarShopsForTest,
  getCarShops,
  getSpecificCarShop,
  addCarShop,
  removeCarShop,
  removeSpecialty,
  updateCarShopInfo
} from './controller';

const carShopRouter = express.Router();

carShopRouter.route('/all')
.get(getAllCarShopsForTest);

carShopRouter.route('/remSpec')
.get(removeSpecialty);

carShopRouter.route('/')
.get(getCarShops)
.post(jwtAuthenticate, addCarShop);

carShopRouter.route('/:id')
.get(getSpecificCarShop)
.put(jwtAuthenticate, updateCarShopInfo)
.delete(jwtAuthenticate, removeCarShop);

export default carShopRouter;
