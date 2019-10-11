import { Router } from 'express';
import authRoute from './auth.routes';
import teamRoute from './team.routes';
import fixtureRoute from './fixture.routes';

const route = new Router();

route.use('/auth', authRoute);
route.use('/', teamRoute);
route.use('/', fixtureRoute);

export default route;
