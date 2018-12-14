import express from 'express';
import {
  localAuthenticate,
  jwtAuthenticate
} from '../../../middleware/passportMiddleware';
import { 
  validateLogin,
  newJWT
} from './authController';

const authRouter = express.Router();

authRouter.post('/login', 
  localAuthenticate, validateLogin);

authRouter.post('/refresh', jwtAuthenticate, newJWT);

export default authRouter;