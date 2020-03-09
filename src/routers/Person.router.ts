import {Router} from 'express';
import { personController } from '../controllers/Person.controller';

export let testRouter = Router();

testRouter.post('/', personController.post);
testRouter.get('/:id', personController.get);
testRouter.post('/login', personController.login);