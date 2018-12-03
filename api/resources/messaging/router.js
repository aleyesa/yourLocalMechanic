import express from 'express';
import {
  getAllMessages,
  getMessageThread,
  createMessage,
  deleteMessage,
  editMessage
} from './controller';

const messagingRouter = express.Router();

messagingRouter.route('/')
.get(getAllMessages)
.post(createMessage);

messagingRouter.route('/thread')
.get(getMessageThread);

messagingRouter.route('/:id')
.put(editMessage)
.delete(deleteMessage);

export default messagingRouter;