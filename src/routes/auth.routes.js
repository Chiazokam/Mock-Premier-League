/* eslint-disable no-console */
import { Router } from 'express';
import AuthControllers from '../controllers/auth.controllers';
import AuthMiddlewares from '../middlewares/auth.middleware';
import tryCatch from '../utils/tryCatch.utils';

const route = new Router();

const { signin, signup } = AuthControllers;
const { doesUserExist } = AuthMiddlewares;

route.post('/signup', doesUserExist, tryCatch(signup));
route.post('/signin', tryCatch(signin));

export default route;
