/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../../app';
import baseUrl from './utils/baseUrl';
import mock from './utils/mock';

let adminUser;
let user;
let teamId;

beforeAll(async () => {
  jest.setTimeout(10000);

  adminUser = await request(app)
    .post(`${baseUrl}/auth/signup`)
    .send(mock.teamAdminDetails);

  user = await request(app)
    .post(`${baseUrl}/auth/signup`)
    .send(mock.teamSignup);
});

describe('Create Team', () => {
  it('should successfully create a team', async () => {
    const res = await request(app)
      .post(`${baseUrl}/teams`)
      .set('authorization', `Bearer ${adminUser.body.token}`)
      .send({
        ...mock.team,
      });
    expect(res.body.status).toEqual(201);
    expect(res.body.message).toEqual('Successfully created a team');
    expect(res.body.data.name).toEqual(mock.team.name);
    teamId = res.body.data._id;
  });

  it('should not create a team as a user', async () => {
    const res = await request(app)
      .post(`${baseUrl}/teams`)
      .set('authorization', `Bearer ${user.body.token}`)
      .send({
        ...mock.team,
      });
    expect(res.body.status).toEqual(401);
    expect(res.body.message).toEqual('You do not have enough permission to perform this action');
  });
});

describe('View Teams', () => {
  it('should successfully get all teams from the server', async () => {
    const res = await request(app)
      .get(`${baseUrl}/teams`)
      .set('authorization', `Bearer ${adminUser.body.token}`);
    expect(res.body.status).toEqual(200);
    expect(res.body.source).toEqual('server');
  });

  it('should successfully get all teams from the cache', async () => {
    const res = await request(app)
      .get(`${baseUrl}/teams`)
      .set('authorization', `Bearer ${adminUser.body.token}`);
    expect(res.body.status).toEqual(200);
    expect(res.body.source).toEqual('cache');
  });
});

describe('Update Team', () => {
  it('should successfully update a team', async () => {
    const res = await request(app)
      .patch(`${baseUrl}/teams/${teamId}`)
      .set('authorization', `Bearer ${adminUser.body.token}`)
      .send({
        name: 'New Horizon',
        ...mock.team,
      });
    expect(res.body.status).toEqual(200);
    expect(res.body.message).toEqual('Successfully updated the team');
    expect(res.body.data.name).toEqual(mock.team.name);
  });

  it('should not update the team as a user', async () => {
    const res = await request(app)
      .patch(`${baseUrl}/teams/${teamId}`)
      .set('authorization', `Bearer ${user.body.token}`)
      .send({
        name: 'Old Lattire',
        ...mock.team,
      });
    expect(res.body.status).toEqual(401);
    expect(res.body.message).toEqual('You do not have enough permission to perform this action');
  });

  it('should not find the team to be updated', async () => {
    const res = await request(app)
      .patch(`${baseUrl}/teams/5d9fb207683b9607c80feca6`)
      .set('authorization', `Bearer ${adminUser.body.token}`)
      .send({
        name: 'Old Lattire',
        ...mock.team,
      });
    expect(res.body.status).toEqual(404);
    expect(res.body.message).toEqual('Team Not Found');
  });
});

describe('Delete Team', () => {
  it('should successfully delete a team', async () => {
    const res = await request(app)
      .delete(`${baseUrl}/teams/${teamId}`)
      .set('authorization', `Bearer ${adminUser.body.token}`);
    expect(res.body.status).toEqual(200);
    expect(res.body.message).toEqual('Successfully deleted the team');
    expect(res.body.data.name).toEqual(mock.team.name);
  });

  it('should not delete the team as a user', async () => {
    const res = await request(app)
      .delete(`${baseUrl}/teams/${teamId}`)
      .set('authorization', `Bearer ${user.body.token}`);
    expect(res.body.status).toEqual(401);
    expect(res.body.message).toEqual('You do not have enough permission to perform this action');
  });

  it('should not find the team to be deleted', async () => {
    const res = await request(app)
      .delete(`${baseUrl}/teams/5d9fb207683b9607c80feca6`)
      .set('authorization', `Bearer ${adminUser.body.token}`)
      .send({
        name: 'Old Lattire',
        ...mock.team,
      });
    expect(res.body.status).toEqual(404);
    expect(res.body.message).toEqual('Team Not Found');
  });
});
