import mongoose from 'mongoose';
import User from './user';
import Team from './team';
import Fixture from './fixture';

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
const connectDb = () => mongoose.connect(process.env.MONGODB_URI, options);
const models = { User, Team, Fixture };

export { connectDb };
export default models;
