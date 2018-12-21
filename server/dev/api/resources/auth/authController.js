import jwt from 'jsonwebtoken';
import {  
  JWT_SECRET,
  JWT_EXPIRY
} from '../../../config/config';

const createAuthToken = (userId) => {

  return jwt.sign({userId}, JWT_SECRET, {

    subject: `${userId}`,
    expiresIn: JWT_EXPIRY,
    algorithm: 'HS256'

  });

};

//request a JWT/ A valid username and password are required, and a new token is given in exchange.
const validateLogin = (req, res) => {
  
  const authToken = createAuthToken(req.user._id);

  res.status(200).json({
    currUserId: req.user._id,
    authToken
  });

};

//request a new JWT with a laster expiry date. A valid, non-expired JWT is required.
const newJWT = (req, res) => {

  const authToken = createAuthToken(req.user._id);

  res.status(200).json({authToken});

};

export {
  validateLogin,
  newJWT
};