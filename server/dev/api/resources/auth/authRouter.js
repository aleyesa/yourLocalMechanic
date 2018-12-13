import express from 'express';
import {
  localAuthenticate,
  jwtAuthenticate
} from '../../../middleware/passportMiddleware';
import { 
  registerUser,
  getUserId,
  validateLogin,
  newJWT
} from './authController';

const authRouter = express.Router();

// POST /api/users/ to request to register a new user, with a given username and password
authRouter.post('/register/', registerUser);

// POST /api/auth/login to request a JWT/ A valid username and password are required, 
//and a new token is given in exchange.
authRouter.post('/login', 
  localAuthenticate, validateLogin);

// GET /api/protected to make a request for a protected API endpoint. 
// A valid, non-expired JWT is required. 
// You use the same JWT to make as many requests as you like until it expires.
authRouter.get('/protected', jwtAuthenticate, getUserId);

// POST /api/auth/refresh to request a new JWT with a laster expiry date. A valid, non-expired JWT is required.
authRouter.post('/refresh', jwtAuthenticate, newJWT);

export default authRouter;