/* eslint-disable no-console */
import { Router } from 'express';
import TeamController from '../controllers/team.controllers';
import AuthMiddleware from '../middlewares/auth.middleware';

const { isUserSignedIn, grantAccess } = AuthMiddleware;
const {
  createTeam, getTeams, updateTeam, deleteTeam,
} = TeamController;

const route = new Router();

route.post('/teams', [isUserSignedIn, grantAccess('createAny', 'team')], createTeam);
route.get('/teams', isUserSignedIn, grantAccess('readAny', 'team'), getTeams);
route.patch('/teams/:id', isUserSignedIn, grantAccess('updateAny', 'team'), updateTeam);
route.delete('/teams/:id', isUserSignedIn, grantAccess('deleteAny', 'team'), deleteTeam);

export default route;
