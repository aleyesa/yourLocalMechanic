import mongoose from 'mongoose';

import Receipt from '../receipt/model';
import {
  Inbox,
  Inquire
 } from '../messaging/model';

 const Schema = mongoose.Schema;

 const carShopOwnerSchema = new Schema({
  username: String,
  password: String,
  carShopInfo: {
    type: Schema.Types.ObjectId,
    ref: 'CarShop'
  }
});

const carShopOwnerSchema = mongoose.model('CarShopOwner', carShopOwnerSchema);

export {
  carShopOwnerSchema
};