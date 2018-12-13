import express from 'express';

import {
  getAllCarShopsForTest,
  getCarShops,
  getSpecificCarShop,
  addCarShop,
  removeCarShop,
  updateCarShopInfo
} from './controller';

const carShopRouter = express.Router();

carShopRouter.route('/all')
.get(getAllCarShopsForTest);

carShopRouter.route('/')
.get(getCarShops)
.post(addCarShop);

carShopRouter.route('/:id')
.get(getSpecificCarShop)
.put(updateCarShopInfo)
.delete(removeCarShop);

export default carShopRouter;
