/* eslint-disable no-console */
import { Router } from 'express';
import FixtureController from '../controllers/fixture.controllers';
import AuthMiddleware from '../middlewares/auth.middleware';
import tryCatch from '../utils/tryCatch.utils';
import { rateLimiter } from '../redis';

const { isUserSignedIn, grantAccess } = AuthMiddleware;
const {
  createFixture, getFixtures, updateFixture, deleteFixture, getFixture,
} = FixtureController;

const route = new Router();

route.post('/fixtures', [isUserSignedIn, rateLimiter, grantAccess('createAny', 'fixture')], tryCatch(createFixture));
route.get('/fixtures', [isUserSignedIn, rateLimiter, grantAccess('readAny', 'fixture')], tryCatch(getFixtures));
route.get('/fixtures/:slug', [isUserSignedIn, rateLimiter, grantAccess('readAny', 'fixture')], tryCatch(getFixture));
route.patch('/fixtures/:id', [isUserSignedIn, rateLimiter, grantAccess('updateAny', 'fixture')], tryCatch(updateFixture));
route.delete('/fixtures/:id', [isUserSignedIn, rateLimiter, grantAccess('deleteAny', 'fixture')], tryCatch(deleteFixture));

export default route;
