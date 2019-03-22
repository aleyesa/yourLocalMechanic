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

carShopRouter.route('/uSpec')
.get((req, res) => {
  res.json('test');
});

carShopRouter.route('/')
.get(getCarShops)
.post(jwtAuthenticate, addCarShop);

carShopRouter.route('/:id')
.get(getSpecificCarShop)
.put(jwtAuthenticate, updateCarShopInfo)
.delete(jwtAuthenticate, removeCarShop);

// carShopRouter.route('/t')
// .get((req, res) => {
//   console.log('cookies');
// });



export default carShopRouter;
