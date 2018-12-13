import { CarShopOwner } from '../carShopOwner/model';
import { Client } from '../client/model';
import jwt from 'jsonwebtoken';
import {  
  JWT_SECRET,
  JWT_EXPIRY
} from '../../../config/config';

const createAuthToken = (username) => {
  return jwt.sign({username}, JWT_SECRET, {
    subject: username,
    expiresIn: JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

//request to register a new user, with a given username and password
const registerUser = (req, res) => {
  const requiredFields = ['username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));
  
  //check if username and password values are strings
  if(!missingField) {
    if(typeof req.body.username === 'string' &&
    typeof req.body.password === 'string'){
      req.body.username = req.body.username.trim();
  
      CarShopOwner.find({ username: req.body.username })
      .then(user => {
        if(!user) {

          console.log(`The user '${user.username} has already been taken.`);

        }else {

          if( req.body.password !== req.body.password.trim() ) {

            console.log('no spaces allowed in the beginning or end of password.');

          }else {

            if( req.body.password.length < 8 ) {

              console.log('Password needs to be at least 8 characters long.');

            }else { 

              CarShopOwner.hashPassword(req.body.password)
              .then(pw => {
                req.body.password = pw;
                CarShopOwner.create(req.body)
                .then(user => res.status(201).json(`${user.username} has been created.`))
              })
              .catch(err => console.log(`failed to create user. \n ${err.message} `));

            }
          }
        }
      });

    }else {
      console.log('username or password is not a string value.');
      res.status(400).json('username or password is not a string value.');
    }

  }else {
    console.log(`${missingField} field is missing.`);
    res.status(400).json(`${missingField} field is missing.`);
  }

};

const getUserId = (req, res) => {
  console.log(req.user.username);
  
  CarShopOwner
  .findOne({ username: req.user.username }) 
  .then(user => 
    res.json(
    {
      username: user.username,
      userId: user._id
    })
  )
  .catch(err => res.json(err));
};

//request a JWT/ A valid username and password are required, and a new token is given in exchange.
const validateLogin = (req, res) => {
  const authToken = createAuthToken(req.body.username);
  res.status(200).json({authToken});
};

//request a new JWT with a laster expiry date. A valid, non-expired JWT is required.
const newJWT = (req, res) => {
  const authToken = createAuthToken(req.user.username);
  res.status(200).json({authToken});
};

export {
  registerUser,
  getUserId,
  validateLogin,
  newJWT
};