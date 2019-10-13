/* eslint-disable no-console */
import { Router } from 'express';
import TeamController from '../controllers/team.controllers';
import AuthMiddleware from '../middlewares/auth.middleware';
import tryCatch from '../utils/tryCatch.utils';
import { rateLimiter } from '../redis';

const { isUserSignedIn, grantAccess } = AuthMiddleware;
const {
  createTeam, getTeams, updateTeam, deleteTeam,
} = TeamController;

const route = new Router();

route.post('/teams', [isUserSignedIn, rateLimiter, grantAccess('createAny', 'team')], tryCatch(createTeam));
route.get('/teams', [isUserSignedIn, rateLimiter, grantAccess('readAny', 'team')], tryCatch(getTeams));
route.patch('/teams/:id', [isUserSignedIn, rateLimiter, grantAccess('updateAny', 'team')], tryCatch(updateTeam));
route.delete('/teams/:id', [isUserSignedIn, rateLimiter, grantAccess('deleteAny', 'team')], tryCatch(deleteTeam));

export default route;
