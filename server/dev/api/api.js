import carShopOwnerRouter from './resources/carShopOwner/router';
import clientRouter from './resources/client/router';
import addressRouter from './resources/address/router';
import phoneRouter from './resources/phone/router';
import carShopRouter from './resources/carShop/router';
import messagingRouter from './resources/messaging/router';
import authRouter from './resources/auth/authRouter';

export default (app) => {
  app.use('/api/carshopowner', authRouter)
  app.use('/api/carshop', carShopRouter);
  app.use('/api/client', clientRouter);
  app.use('/api/address', addressRouter);
  app.use('/api/phone', phoneRouter);
  app.use('/api/carshopowner', carShopOwnerRouter);
  app.use('/api/message', messagingRouter);
};





 




