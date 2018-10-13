import express from 'express';
import {Expert} from './model';

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
  .findByIdAndDelete(req.param)
  .then(expert => res.json(`${expert.username} has been deleted`));
});

expertRouter.get('/expert/:id', (req, res) => {
  Expert
  .findById(req.param)
  .then(expert => {
    res.json(expert);
  });
});

expertRouter.put('/expert/:id', (req, rest) => {
  Expert
  .findByIdAndUpdate(req.param)
  .then(expert => {
    res.json(expert);
  });
});

export default expertRouter;




