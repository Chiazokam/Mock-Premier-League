/* eslint-disable no-console */
import { Router } from 'express';
import redis from 'redis';
import client from '../redis';


const signup = (req, res) => {
  client.set('verykey', 'random value', redis.print);
  client.get('verykey', (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    console.log(`GET result ->${result}`);
  });
  res.send(200, 'hi');
};

const route = new Router();

route.post('/signup', signup);

export default route;
