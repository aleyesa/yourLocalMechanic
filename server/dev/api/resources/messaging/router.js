import express from 'express';
import {
  jwtAuthenticate
} from '../../../middleware/passportMiddleware';
import {
  getAllMessages,
  getMessageThread,
  createMessage,
  editMessage,
  deleteMessage,
  deleteConversation
} from './controller';

const messagingRouter = express.Router();

messagingRouter.route('/')
.get(jwtAuthenticate, getAllMessages)
.post(jwtAuthenticate, createMessage);

messagingRouter.route('/thread')
.get(jwtAuthenticate, getMessageThread)
.delete(jwtAuthenticate, deleteConversation);

messagingRouter.route('/:id')
.put(jwtAuthenticate, editMessage)
.delete(jwtAuthenticate, deleteMessage);

export default messagingRouter;