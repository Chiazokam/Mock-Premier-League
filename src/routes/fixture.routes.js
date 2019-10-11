/* eslint-disable no-console */
import { Router } from 'express';
import FixtureController from '../controllers/fixture.controllers';
import AuthMiddleware from '../middlewares/auth.middleware';
import tryCatch from '../utils/tryCatch.utils';

const { isUserSignedIn, grantAccess } = AuthMiddleware;
const {
  createFixture, getFixtures, updateFixture, deleteFixture,
} = FixtureController;

const route = new Router();

route.post('/fixtures', [isUserSignedIn, grantAccess('createAny', 'fixture')], tryCatch(createFixture));
route.get('/fixtures', isUserSignedIn, grantAccess('readAny', 'fixture'), tryCatch(getFixtures));
route.patch('/fixtures/:id', isUserSignedIn, grantAccess('updateAny', 'fixture'), tryCatch(updateFixture));
route.delete('/fixtures/:id', isUserSignedIn, grantAccess('deleteAny', 'fixture'), tryCatch(deleteFixture));

export default route;
