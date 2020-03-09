import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import { constants } from '../../util';
import { Person } from '../models/Person.model';


export function registerJwtStrategy() {
  console.log('executing jwt strategy registration');
  
  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: constants.jwtSecret
  }, async (payload, done) => {
    try {
      console.log(payload);
      const person = await Person.findByPk(payload.id);
      if (!person) return done(null, false);
      console.log('found the person');
      done(null, person);
    } 
    catch (err) { done(err, false); }
  }));
}

