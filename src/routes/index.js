import { Router } from 'express';
import authRoute from './auth.routes';
import teamRoute from './team.routes';
import fixtureRoute from './fixture.routes';
import searchRoute from './search.routes';

const route = new Router();

route.use('/auth', authRoute);
route.use('/', teamRoute);
route.use('/', fixtureRoute);
route.use('/', searchRoute);

export default route;
