/* eslint-disable no-console */
import { Router } from 'express';
import tryCatch from '../utils/tryCatch.utils';
import SearchController from '../controllers/search.controllers';

const route = new Router();

const { searchResource } = SearchController;

route.get('/search', tryCatch(searchResource));

export default route;
