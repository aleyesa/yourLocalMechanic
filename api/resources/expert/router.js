import express from 'express';

const expertRouter = express.Router();

expertRouter.get('/expert', (req, res) => {
  res.json('get response working.');
});

export default expertRouter;




