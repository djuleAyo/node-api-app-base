import {Router} from 'express';
import { personController } from '../controllers/Person.controller';
import passport from 'passport';
import * as passprt from '../middleware/passport';

passprt.registerJwtStrategy();
passprt.registerLocalStrategy();
passprt.registerGoogleAuth();

export let testRouter = Router();

testRouter.post('/', personController.post);
testRouter.post('/login', passport.authenticate('local', {session: false}), personController.login);
testRouter.get('/:id', passport.authenticate('jwt', {session: false}),  personController.get);
testRouter.post('/oauth/google', passport.authenticate('googleAuth', {session: false}));