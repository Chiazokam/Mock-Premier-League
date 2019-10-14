import models from '../models';

const createSeededTeams = async () => {
  await models.Team.deleteMany({});
  const team1 = new models.Team({
    name: 'Dark Phoenix',
    stadiumName: 'Holloway Stadium',
  });

  const team2 = new models.Team({
    name: 'Brave Monkeys',
    stadiumName: 'Madari Stadium',
  });
  const team3 = new models.Team({
    name: 'Old Garay',
    stadiumName: 'Madari Stadium',
  });
  const team4 = new models.Team({
    name: 'Red Indians',
    stadiumName: 'Indiana Stadium',
  });
  const team5 = new models.Team({
    name: 'Dark Keepers',
    stadiumName: 'Madari Stadium',
  });
  const team6 = new models.Team({
    name: 'Mountain Climbers',
    stadiumName: 'Madari Stadium',
  });
  const team7 = new models.Team({
    name: 'Old Hampton',
    stadiumName: 'Madari Stadium',
  });
  const team8 = new models.Team({
    name: 'Fat Gorillas',
    stadiumName: 'Madari Stadium',
  });
  await team1.save();
  await team2.save();
  await team3.save();
  await team4.save();
  await team5.save();
  await team6.save();
  await team7.save();
  await team8.save();
};

export default createSeededTeams;
