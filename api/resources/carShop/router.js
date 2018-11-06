import express from 'express';

import {
  getCarShops,
  getSpecificCarShop,
  addCarShop,
  removeCarShop,
  updateCarShopInfo
} from './controller';

const carShopRouter = express.Router();

carShopRouter.route('/')
.get(getCarShops)

carShopRouter.route('/:id')
.get(getSpecificCarShop)
.post(addCarShop)
.put(updateCarShopInfo)
.delete(removeCarShop);

export default carShopRouter;
