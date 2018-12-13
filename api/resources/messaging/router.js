import express from 'express';
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
.get(getAllMessages)
.post(createMessage);

messagingRouter.route('/thread')
.get(getMessageThread)
.delete(deleteConversation);

messagingRouter.route('/:id')
.put(editMessage)
.delete(deleteMessage);

export default messagingRouter;