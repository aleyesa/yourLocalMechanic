import { Client } from './model';

const getAllClients = (req, res) => {

  Client
  .find()
  .then(clients => {
    res.json(clients);
  })
  .catch(err => res.status(400).json(err));

};

const getClientInfo = (req, res) => {

  Client
  .findById(req.params.id)
  .populate({
    path: 'carShopMessages',
    select: 'firstName lastName',
    model: 'CarShopOwner'
    // ,
    // options: { 
    //   sort: {
    //   'timestamp': 1
    //   }
    // }
  })
  .then(client => res.json(client))
  .catch(err => res.status(400).json(err));

};

const createClient = (req, res) => {

  const requiredFields = ['username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));
  
  //check if username and password values are strings
  if(!missingField) {
    if(typeof req.body.username === 'string' &&
    typeof req.body.password === 'string'){
      req.body.username = req.body.username.trim();
  
      Client.find({ username: req.body.username })
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

              Client.hashPassword(req.body.password)
              .then(pw => {
                req.body.password = pw;
                Client.create(req.body)
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

const updateClient = (req, res) => {

  let newPassword = '';

  if(req.body.password) {

    if( (req.body.password === req.body.password.trim()) && (req.body.password.length > 8)) {

      Client.hashPassword(req.body.password)
      .then(pw => {
        req.body.password = pw;
        Client.findByIdAndUpdate(req.params.id, req.body)
      .then(updatedInfo => {
          res.json(updatedInfo);
        });
      })
      .catch(err => console.log(`failed to accept new password. \n ${err.message} `));
    } else { 
      res.json('Did not meet criteria, could not update password.');
      console.log('Did not meet criteria.');
    }
  } 
      Client
      .findByIdAndUpdate(req.params.id, req.body)
      .then(client => res.json(client))
      .catch(err => res.status(400).json(err));
};

const deleteClient = (req, res) => {

  Client
  .findOneAndDelete(req.params.id)
  .then(client => res.json(`The user ${client.username} has been deleted.`))
  .catch(err => res.status(400).json(err));

};

export {
  getAllClients,
  getClientInfo,
  createClient,
  updateClient,
  deleteClient
};

