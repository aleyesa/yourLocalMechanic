import express from 'express';

import {
  getCarShops,
  getSpecificCarShop,
  removeCarShop,
  updateCarShopInfo
} from './controller';

const carShopRouter = express.Router();

carShopRouter.route('/')
.get(getCarShops);

carShopRouter.route('/:id')
.get(getSpecificCarShop)
.put(updateCarShopInfo)
.delete(removeCarShop);

export default carShopRouter;
