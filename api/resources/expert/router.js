import express from 'express';

import {
  findExpertByLocation,

  getAllExperts,
  registerExpert,
  deleteExpert,
  getSpecificExpert,
  updateExpertInfo
} from './controller';
    
const expertRouter = express.Router();

//chaining routes
expertRouter.route('/')
.get(getAllExperts)
.post(registerExpert);

expertRouter.route('/:id')
.get(getSpecificExpert)
.put(updateExpertInfo)
.delete(deleteExpert);

expertRouter.route('/location/:city/:state/:zipcode')
.get(findExpertByLocation);

export default expertRouter;





























//Example1 using routes

// import { addUser, deleteUser, getUsers, getUser } from './userCtrl';

// router.route('/') .get(getUsers) .post(addUser);

// // client needs to send jwt in the header (Authentication: Bearer <token>) with this GET request, // otherwise passport jwt strategy sends a 401 Unauthorized back 
// router.route('/:id') .get(jwtAuth, getUser) .delete(jwtAuth, deleteUser)

// export default router;

// //Example2 usding route
// app.use('/api/user', userRoutes);




