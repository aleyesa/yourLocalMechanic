import passport from 'passport';
import {
  localStrategy,
  jwtStrategy
} from '../api/resources/auth/strategies';

passport.use(jwtStrategy);
passport.use(localStrategy);

const localAuthenticate = passport.authenticate('local', { session: false });
const jwtAuthenticate = passport.authenticate('jwt', { session: false } );

export {
  localAuthenticate,
  jwtAuthenticate
};