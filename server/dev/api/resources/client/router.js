import express from 'express';
import {
  jwtAuthenticate
} from '../../../middleware/passportMiddleware';
import {
  getAllClients,
  getClientInfo,
  createClient,
  updateClient,
  deleteClient
} from './controller';

const clientRouter = express.Router();

clientRouter.route('/')
.get(getAllClients)
.post(createClient);

clientRouter.route('/:id')
.get(getClientInfo)
.put(updateClient)
.delete(deleteClient);

export default clientRouter;