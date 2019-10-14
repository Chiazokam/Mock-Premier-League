import models from '../models';

const createSeededFixtures = async () => {
  await models.Fixture.deleteMany({});
  const fixture1 = new models.Fixture({
    time: '2019-05-18T16:00:00Z',
    home: 'Dark Phoenix',
    away: 'Brave Monkeys',
    location: 'New Carod Stadium',
    status: 'pending',
    slug: 'Dark Phoenix-Brave Monkeys-24e58',
  });
  const fixture2 = new models.Fixture({
    time: '2019-05-18T16:00:00Z',
    home: 'Old Hampton',
    away: 'Brave Monkeys',
    location: 'New Carod Stadium',
    status: 'completed',
    slug: 'Old Hampton-Brave Monkeys-28j58',
  });
  const fixture3 = new models.Fixture({
    time: '2019-05-18T16:00:00Z',
    home: 'Mountain Climbers',
    away: 'Dark Phoenix',
    status: 'completed',
    location: 'New Carod Stadium',
    slug: 'Mountain Climbers-Dark Phoenix-28j97',
  });
  const fixture4 = new models.Fixture({
    time: '2019-05-18T16:00:00Z',
    home: 'Fat Gorillas',
    away: 'Brave Monkeys',
    status: 'completed',
    location: 'New Carod Stadium',
    slug: 'Fat Gorillas-Brave Monkeys-28ji0',
  });
  const fixture5 = new models.Fixture({
    time: '2020-05-18T16:00:00Z',
    home: 'Dark Keepers',
    away: 'Mountain Climbers',
    location: 'New Carod Stadium',
    slug: 'Dark Keepers-Mountain Climbers-20ji0',
  });
  const fixture6 = new models.Fixture({
    time: '2020-06-18T16:00:00Z',
    home: 'Red Indians',
    away: 'Old Garay',
    location: 'New Carod Stadium',
    slug: 'Red Indians-Old Garay-29300',
  });
  const fixture7 = new models.Fixture({
    time: '2019-05-18T16:00:00Z',
    home: 'Old Garay',
    away: 'Dark Phoenix',
    location: 'New Carod Stadium',
    slug: 'Old Garay-Dark Phoenix-28ji0',
  });
  await fixture1.save();
  await fixture2.save();
  await fixture3.save();
  await fixture4.save();
  await fixture5.save();
  await fixture6.save();
  await fixture7.save();
};

export default createSeededFixtures;
