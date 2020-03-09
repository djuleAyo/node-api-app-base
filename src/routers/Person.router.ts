import {Router} from 'express';
import { personController } from '../controllers/Person.controller';
import passport from 'passport';
import * as passprt from '../middleware/passport';

passprt.registerJwtStrategy();

export let testRouter = Router();

testRouter.post('/', personController.post);
testRouter.get('/:id', passport.authenticate('jwt', {session: false}),  personController.get);
testRouter.post('/login', personController.login);