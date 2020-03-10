import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import { constants } from '../../util';
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
    if (!person) return done(new Error('Email not found.'), undefined);
    if (person.psswd !== psswd) return done(new Error('Invalid password.'), undefined);

    done(null, person);
  }));
}

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

