import { CarShopOwner } from '../carShopOwner/model';
import { Client } from '../client/model';
import LocalStrategy  from 'passport-local';
import JwtStrategy from 'passport-jwt';
import { JWT_SECRET } from '../../../config/config';

const { Strategy, ExtractJwt } = JwtStrategy;

const localStrategy = new LocalStrategy.Strategy((username, password, callbackfn) => {
  CarShopOwner
  .findOne( { username } )
  .then(user => {

    user.comparePw(password, user.password)
    .then(user => {
      if(user) {
        console.log('Login was successful.');
        return callbackfn(null, user);
      }else {
        console.log('Login was not successful, invalid password.');
        return callbackfn(null, false);
      }

    })
    .catch(err => console.log('failed to log in as car shop owner.'));
  })
  .catch(err => console.log(err));

  // Client
  // .findOne( { username } )
  // .then(user => {

  //   user.comparePw(password, user.password)
  //   .then(user => {
  //     if(user) {
  //       console.log('Login was successful.');
  //       return callbackfn(null, user);
  //     }else {
  //       console.log('Login was not successful, invalid password.');
  //       return callbackfn(null, false);
  //     }

  //   })
  //   .catch(err => console.log('failed to log in as car shop owner.'));
  // })
  // .catch(err => console.log(err));

});

const jwtStrategy = new Strategy({
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  algorithms: ['HS256']
},
(payload, done) => {
  done(null, payload);
}
);

export { 
  localStrategy,
  jwtStrategy
};