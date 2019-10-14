import models from '../models';

const createSeededUsers = async () => {
  await models.User.deleteMany({});
  const user1 = new models.User({
    email: 'admin@admin.com',
    password: '$2b$10$LW0SHk26krESZBKINMC6b.fVGd1.GoFjAlCouvVKftDt1G2IRn6Be',
    role: 'admin',
  });

  const user2 = new models.User({
    email: 'john@john.com',
    password: '$2b$10$LW0SHk26krESZBKINMC6b.fVGd1.GoFjAlCouvVKftDt1G2IRn6Be',
    role: 'admin',
  });
  const user3 = new models.User({
    email: 'jane@jane.com',
    password: '$2b$10$LW0SHk26krESZBKINMC6b.fVGd1.GoFjAlCouvVKftDt1G2IRn6Be',
  });
  const user4 = new models.User({
    email: 'lisa@lisa.com',
    password: '$2b$10$LW0SHk26krESZBKINMC6b.fVGd1.GoFjAlCouvVKftDt1G2IRn6Be',
  });
  const user5 = new models.User({
    email: 'alice@alice.com',
    password: '$2b$10$LW0SHk26krESZBKINMC6b.fVGd1.GoFjAlCouvVKftDt1G2IRn6Be',
  });
  await user1.save();
  await user2.save();
  await user3.save();
  await user4.save();
  await user5.save();
};

export default createSeededUsers;
