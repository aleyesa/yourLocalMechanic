import express from 'express';

import {
  getAllExperts,
  registerExpert,
  deleteExpert,
  getSpecificExpert,
  updateExpertInfo,
  showExpertInfo
} from './controller';

const expertRouter = express.Router();

expertRouter.get('/expert', getAllExperts);

expertRouter.post('/expert', registerExpert);

expertRouter.delete('/expert/:id', deleteExpert);

expertRouter.get('/expert/:id', getSpecificExpert);

expertRouter.put('/expert/:id', updateExpertInfo);

expertRouter.get('/experts/:id', showExpertInfo);

export default expertRouter;




