/* eslint-disable no-underscore-dangle */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../../app';
import baseUrl from './utils/baseUrl';
import mock from './utils/mock';

chai.use(chaiHttp);
let adminUser;
let user;
let teamId;

describe.only('Team test suite', () => {
  before(async () => {
    const options = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };
    mongoose.connect('mongodb://localhost/db-test', options, () => {
      mongoose.connection.db.dropDatabase(() => {
      });
    });

    adminUser = (await chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send(mock.adminDetails)).body;

    user = (await chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send(mock.signup)).body;
    });

  describe('Create Team', () => {
    it('should successfully create a team', async () => {
      const res = await chai
        .request(app)
        .post(`${baseUrl}/teams`)
        .set('authorization', `Bearer ${adminUser.token}`)
        .send({
          ...mock.team,
        });
      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal('Successfully created a team');
      expect(res.body.data.name).to.equal(mock.team.name);
      teamId = res.body.data._id;
    });

    it('should not create a team as a user', async () => {
      const res = await chai
        .request(app)
        .post(`${baseUrl}/teams`)
        .set('authorization', `Bearer ${user.token}`)
        .send({
          ...mock.team,
        });
      expect(res.status).to.equal(401);
      expect(res.body.message).to.equal('You do not have enough permission to perform this action');
    });
  });

  describe('View Teams', () => {
    it('should successfully get all teams', async () => {
      const res = await chai
        .request(app)
        .get(`${baseUrl}/teams`)
        .set('authorization', `Bearer ${adminUser.token}`);
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Successfully retrieved all teams');
    });
  });

  describe('Update Team', () => {
    it('should successfully update a team', async () => {
      const res = await chai
        .request(app)
        .patch(`${baseUrl}/teams/${teamId}`)
        .set('authorization', `Bearer ${adminUser.token}`)
        .send({
          name: 'New Horizon',
          ...mock.team,
        });
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Successfully updated the team');
      expect(res.body.data.name).to.equal(mock.team.name);
    });

    it('should not update the team as a user', async () => {
      const res = await chai
        .request(app)
        .patch(`${baseUrl}/teams/${teamId}`)
        .set('authorization', `Bearer ${user.token}`)
        .send({
          name: 'Old Lattire',
          ...mock.team,
        });
      expect(res.status).to.equal(401);
      expect(res.body.message).to.equal('You do not have enough permission to perform this action');
    });
  });

  describe('Delete Team', () => {
    it('should successfully delete a team', async () => {
      const res = await chai
        .request(app)
        .delete(`${baseUrl}/teams/${teamId}`)
        .set('authorization', `Bearer ${adminUser.token}`)
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Successfully deleted the team');
      expect(res.body.data.name).to.equal(mock.team.name);
    });

    it('should not delete the team as a user', async () => {
      const res = await chai
        .request(app)
        .delete(`${baseUrl}/teams/${teamId}`)
        .set('authorization', `Bearer ${user.token}`)
      expect(res.status).to.equal(401);
      expect(res.body.message).to.equal('You do not have enough permission to perform this action');
    });
  });
});
