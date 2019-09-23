import models from '../models';

const createSeededUsers = async () => {
  await models.User.deleteMany({});
  const user1 = new models.User({
    email: 'admin@mock.com',
    password: 'adminPassword123',
  });

  const user2 = new models.User({
    email: 'john@mock.com',
    password: 'johnPassword123',
  });
  await user1.save();
  await user2.save();
};

export default createSeededUsers;
