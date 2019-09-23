import models from '../models';

const createSeededTeams = async () => {
  await models.Team.deleteMany({});
  const team1 = new models.Team({
    teamId: '5d8ca1c2beb89cdc9d639e17',
    name: 'Dark Phoenix',
    stadiumName: 'Holloway Stadium',
  });

  const team2 = new models.Team({
    teamId: '5d8ca1db807f121ef2ab44e6',
    name: 'Brave Monkeys',
    stadiumName: 'Madari Stadium',
  });
  await team1.save();
  await team2.save();
};

export default createSeededTeams;
