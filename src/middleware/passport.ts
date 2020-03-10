import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import { constants, errObj } from '../../util';
import { Person } from '../models/Person.model';
import {Strategy as LocalStrategy} from 'passport-local';


export function registerLocalStrategy() {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'psswd'
  }, async (email, psswd, done) => {
    const person = await Person.findOne({
      where: {email}
    });
    if (!person) return done(errObj({error: 'No person with given email.', status: 401}), undefined);
    if (person.psswd !== psswd) 
      return done(errObj({error: 'Invalid password.', status: 401}), undefined);

    done(null, person);
  }));
}

export function registerJwtStrategy() {
  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: constants.jwtSecret
  }, async (payload, done) => {
    try {
      const person = await Person.findByPk(payload.id);
      if (!person) return done(null, false);
      done(null, person);
    } 
    catch (err) { done(err, false); }
  }));
}

