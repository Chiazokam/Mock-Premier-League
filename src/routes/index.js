import { Router } from 'express';
import authRoute from './auth';

const route = new Router();

route.use('/auth', authRoute);

export default route;
