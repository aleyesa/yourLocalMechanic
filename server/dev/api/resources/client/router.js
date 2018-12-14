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
.get(jwtAuthenticate, getAllClients)
.post(createClient);

clientRouter.route('/:id')
.get(jwtAuthenticate, getClientInfo)
.put(jwtAuthenticate, updateClient)
.delete(jwtAuthenticate, deleteClient);

export default clientRouter;