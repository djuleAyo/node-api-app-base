import {Router} from 'express';
import { personController } from '../controllers/Person.controller';
import passport from 'passport';
import * as passprt from '../middleware/passport';

passprt.registerJwtStrategy();
passprt.registerLocalStrategy();

export let testRouter = Router();

testRouter.post('/', personController.post);
testRouter.post('/login', passport.authenticate('local', {session: false}), personController.login);
testRouter.get('/:id', passport.authenticate('jwt', {session: false}),  personController.get);