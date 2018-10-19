import express from 'express';
import {
  Expert,
  Inbox,
  Inquire,
  Bill
} from './model';

const expertRouter = express.Router();

expertRouter.get('/expert', (req, res) => {
  Expert
  .find()
  .then(experts => {
    res.json(experts);
  });
});

expertRouter.post('/expert', (req, res) => {
  Expert
  .create(req.body)
  .then(expert => {
    res.json(expert);
  });
});

expertRouter.delete('/expert/:id', (req, res) => {
  Expert
  .findByIdAndDelete(req.params)
  .then(expert => res.json(`${expert.username} has been deleted`));
});

expertRouter.get('/expert/:id', (req, res) => {
  Expert
  .findById(req.param)
  .then(expert => {
    res.json(expert);
  });
});

expertRouter.put('/expert/:id', (req, res) => {
  //should be able to update any of the following
  //related to the expert model
  //personal info
  //skills
  //change user password
/*
1) use a query on Expert collection to find user by id
2) Once we get user id, we should be able to use that user id 
to get connected to other collections related to the Expert
3) Simply update each collection using the find and update
*/
  const expertSkillsId = '';

  const pId = 
  PersonalInfo
  .create(req.body);

  const eId = 
  ExpertSkills
  .create(req.body);

  pId.then(id => console.log(id._id));
  eId.then(id => console.log(id.Id));


});

export default expertRouter;




