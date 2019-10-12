/* eslint-disable consistent-return */
/* eslint-disable no-console */
import redis from 'redis';
import moment from 'moment';
import dotenv from 'dotenv';
import { verifyToken } from './utils/jwt.utils';

dotenv.config();

const { MAX_RATE, MIN_CALL_RATE_IN_MINUTES } = process.env;

const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected');
});

client.on('error', (err) => {
  console.log(`Something went wrong ${err}`);
});

/* istanbul ignore next */

export const rateLimiter = async (req, res, next) => {
  const userObject = await verifyToken(req.headers.authorization.split(' ')[1]);
  const { id } = userObject;
  client.exists(id, (err, exist) => {
    if (err) {
      console.log('Redis not working...');
    }
    if (exist === 1) {
      client.get(id, (err, reply) => {
        const data = JSON.parse(reply);
        const currentTime = moment().unix();
        const difference = (currentTime - data.startTime) / 60;

        // If API call attempts time exceeds 1 minute, reset the cache value
        if (difference >= MIN_CALL_RATE_IN_MINUTES) {
          const body = {
            count: 1,
            startTime: moment().unix(),
          };
          client.set(id, JSON.stringify(body));
          return next();
        }
        if (difference < MIN_CALL_RATE_IN_MINUTES) {
          if (data.count >= MAX_RATE) {
            return res.status(429).json({
              status: 429,
              message: 'API Request limit exceeded. Please try again later',
            });
          }

          /* If API call attempts time is still less than 1 min and API call
          attempts is still less than the max rate count,
          increase the call count and update the cache */
          data.count += 1;
          client.set(id, JSON.stringify(data));
          return next();
        }
      });
    } else {
      const body = {
        count: 1,
        startTime: moment().unix(),
      };
      client.set(id, JSON.stringify(body));
      return next();
    }
  });
};

export default client;
