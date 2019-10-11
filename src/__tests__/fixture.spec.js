/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../../app';
import baseUrl from './utils/baseUrl';
import mock from './utils/mock';

let adminUser;
let user;
let fixtureId;

beforeAll(async () => {
  jest.setTimeout(10000);
  adminUser = await request(app)
    .post(`${baseUrl}/auth/signup`)
    .send(mock.fixtureAdminDetails);

  user = await request(app)
    .post(`${baseUrl}/auth/signup`)
    .send(mock.fixtureSignup);
});

describe('Create Fixture', () => {
  it('should successfully create a fixture', async () => {
    const res = await request(app)
      .post(`${baseUrl}/fixtures`)
      .set('authorization', `Bearer ${adminUser.body.token}`)
      .send({
        ...mock.fixture,
      });
    expect(res.body.status).toEqual(201);
    expect(res.body.message).toEqual('Successfully created a fixture');
    expect(res.body.data.name).toEqual(mock.fixture.name);
    fixtureId = res.body.data._id;
  });

  it('should not create a fixture as a user', async () => {
    const res = await request(app)
      .post(`${baseUrl}/fixtures`)
      .set('authorization', `Bearer ${user.body.token}`)
      .send({
        ...mock.fixture,
      });
    expect(res.body.status).toEqual(401);
    expect(res.body.message).toEqual('You do not have enough permission to perform this action');
  });
});

describe('View Fixtures', () => {
  it('should successfully get all pending fixtures from the server', async () => {
    const res = await request(app)
      .get(`${baseUrl}/fixtures?status=pending`)
      .set('authorization', `Bearer ${adminUser.body.token}`);
    expect(res.body.status).toEqual(200);
    expect(res.body.source).toEqual('server');
  });

  it('should successfully get all pending fixtures from the cache', async () => {
    const res = await request(app)
      .get(`${baseUrl}/fixtures?status=pending`)
      .set('authorization', `Bearer ${adminUser.body.token}`);
    expect(res.body.status).toEqual(200);
    expect(res.body.source).toEqual('cache');
  });
});

describe('Update Fixture', () => {
  it('should successfully update a fixture', async () => {
    const res = await request(app)
      .patch(`${baseUrl}/fixtures/${fixtureId}`)
      .set('authorization', `Bearer ${adminUser.body.token}`)
      .send({
        time: '01-01-2020',
        ...mock.fixture,
      });
    expect(res.body.status).toEqual(200);
    expect(res.body.message).toEqual('Successfully updated the fixture');
  });

  it('should not update the fixture as a user', async () => {
    const res = await request(app)
      .patch(`${baseUrl}/fixtures/${fixtureId}`)
      .set('authorization', `Bearer ${user.body.token}`)
      .send({
        time: '30-01-2020',
        ...mock.fixture,
      });
    expect(res.body.status).toEqual(401);
    expect(res.body.message).toEqual('You do not have enough permission to perform this action');
  });

  it('should not find the fixture to be updated', async () => {
    const res = await request(app)
      .patch(`${baseUrl}/fixtures/5d9fb207683b9607c80feca6`)
      .set('authorization', `Bearer ${adminUser.body.token}`)
      .send({
        time: '03-11-2019',
        ...mock.fixture,
      });
    expect(res.body.status).toEqual(404);
    expect(res.body.message).toEqual('Fixture Not Found');
  });
});

describe('Delete Fixture', () => {
  it('should successfully delete a fixture', async () => {
    const res = await request(app)
      .delete(`${baseUrl}/fixtures/${fixtureId}`)
      .set('authorization', `Bearer ${adminUser.body.token}`);
    expect(res.body.status).toEqual(200);
    expect(res.body.message).toEqual('Successfully deleted the fixture');
  });

  it('should not delete the fixture as a user', async () => {
    const res = await request(app)
      .delete(`${baseUrl}/fixtures/${fixtureId}`)
      .set('authorization', `Bearer ${user.body.token}`);
    expect(res.body.status).toEqual(401);
    expect(res.body.message).toEqual('You do not have enough permission to perform this action');
  });

  it('should not find the fixture to be deleted', async () => {
    const res = await request(app)
      .delete(`${baseUrl}/fixtures/5d9fb207683b9607c80feca6`)
      .set('authorization', `Bearer ${adminUser.body.token}`)
      .send({
        time: '29-11-2019',
        ...mock.fixture,
      });
    expect(res.body.status).toEqual(404);
    expect(res.body.message).toEqual('Fixture Not Found');
  });
});
