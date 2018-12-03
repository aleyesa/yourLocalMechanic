import express from 'express';
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