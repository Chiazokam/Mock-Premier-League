import { Router } from 'express';
import authRoute from './auth.routes';
import teamRoute from './team.routes';

const route = new Router();

route.use('/auth', authRoute);
route.use('/', teamRoute);

export default route;
