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

carShopRouter.route('/')
.get(getAllCarShopsForTest);

carShopRouter.route('/:city/:state/:zipcode')
.get(getCarShops);

carShopRouter.route('/:id')
.get(getSpecificCarShop)
.post(addCarShop)
.put(updateCarShopInfo)
.delete(removeCarShop);

export default carShopRouter;
