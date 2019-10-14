import models from '../models';

const createSeededFixtures = async () => {
  await models.Fixture.deleteMany({});
  const fixture1 = new models.Fixture({
    time: '2019-05-18T16:00:00Z',
    home: 'Dark Phoenix',
    away: 'Brave Monkeys',
    location: 'New Carod Stadium',
    slug: 'Dark Phoenix-Brave Monkeys-24e58',
  });
  await fixture1.save();
};

export default createSeededFixtures;
