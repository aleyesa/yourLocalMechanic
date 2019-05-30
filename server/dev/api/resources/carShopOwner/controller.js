import { CarShopOwner } from './model';

const getAllCarShopOwner = (req, res) => {

  CarShopOwner
  .find()
  .populate({
    path: 'clientMessages',
    select: 'firstName lastName',
    model: 'Client'
  })
  .populate({
    path: 'carShopInfo',
    select: 'shopName',
    model: 'CarShop'
  })
  .then(owner => {

    res.json(owner);
  
  })
  .catch(err => res.status(400).json('could not find any car shop owners.'));

};

const getCarShopOwnerInfo = (req, res) => {

  CarShopOwner
  .findById(req.params.id)
  .populate({
    path: 'clientMessages',
    select: 'firstName lastName',
    model: 'Client'
    // ,
    // options: { 
    //   sort: {
    //   'timestamp': 1
    //   }
    // }
  })
  .populate({
    path: 'carShopInfo',
    model: 'CarShop',
    populate: [{
      path: 'carShopPhone',
      model: 'Phone'
    },
    {
      path: 'location',
      model: 'Address'
    }]
  })
  .then(ownerInfo => {

    res.json(ownerInfo);

  })
  .catch(err => res.status(400).json('could not find any car shop owners.'));

};

const createAccount = (req, res) => {

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
          res.json('username already taken.');

        }else {

          if( req.body.password !== req.body.password.trim() ) {

            console.log('no spaces allowed in the beginning or end of password.');
            res.json('no spaces allowed in the beginning or end of password.');

          }else {

            if( req.body.password.length < 8 ) {

              console.log('Password needs to be at least 8 characters long.');
              res.json('Password needs to be at least 8 characters long.');

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
      })
      .catch(err => res.json('failed to create account.'));

    }else {
      console.log('username or password is not a string value.');
      res.status(400).json('username or password is not a string value.');
    }

  }else {
    console.log(`${missingField} field is missing.`);
    res.status(400).json(`${missingField} field is missing.`);
  }

};

const updateCarShopOwnerInfo = (req, res) => {
    let newPassword = '';

      if(req.body.password) {
 
        if( (req.body.password === req.body.password.trim()) && (req.body.password.length > 8)) {

          CarShopOwner.hashPassword(req.body.password)
          .then(pw => {
            req.body.password = pw;
            CarShopOwner.findByIdAndUpdate(req.params.id, req.body)
          .then(updatedInfo => {
              res.json(updatedInfo)
            });
          })
          .catch(err => console.log(`failed to accept new password. \n ${err.message} `));
        } else { 
          res.json('Did not meet criteria, could not update password.');
          console.log('Did not meet criteria.');
        }
      } else {
      CarShopOwner.findByIdAndUpdate(req.params.id, req.body)
      .then(updatedInfo => res.json(updatedInfo))
      .catch(err => res.json('Could not update info'));
    
      }
  };

const deleteCarShopOwnerAccount = (req, res) => {

  CarShopOwner
  .findByIdAndDelete(req.params.id)
  .then(account => res.json('Car shop owner has been removed.'))
  .catch(err => res.status(400).json('failed to delete account.'));

};

const comparePWTester = (req, res) => {
  CarShopOwner
  .findById(req.body._id)
  .then(cso => {
    console.log(cso.password);
    console.log(req.body.pw);
    cso.comparePw(req.body.pw, cso.password)
    .then(resp => {
      console.log(resp);
      if(resp === true){
        res.json(true);
      } else {
        res.json('wrong password need authentication.');
      }

    });
  });
};

export {
  getAllCarShopOwner,
  getCarShopOwnerInfo,
  createAccount,
  updateCarShopOwnerInfo,
  deleteCarShopOwnerAccount,

  comparePWTester
};