import express from 'express';
import {
  getAllMessages,
  createMessage,
  getMessageThread,
  addReply
} from './controller';

const messagingRouter = express.Router();

messagingRouter.route('/')
.get(getAllMessages)
.post(createMessage);

messagingRouter.route('/thread')
.get(getMessageThread);

messagingRouter.route('/:id')
.get()
.put(addReply)
.delete();

export default messagingRouter;