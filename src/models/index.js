import mongoose from 'mongoose';
import User from './user';
import Team from './team';
import Fixture from './fixture';

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
};
const connectDb = () => mongoose.connect(process.env.DATABASE_URL, options);
const models = { User, Team, Fixture };

export { connectDb };
export default models;
