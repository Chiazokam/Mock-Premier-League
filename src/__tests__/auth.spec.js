import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../../app';
import baseUrl from './utils/baseUrl';
import mock from './utils/mock';

chai.use(chaiHttp);

describe('Auth test suite', () => {
  before((done) => {
    const options = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    };
    mongoose.connect('mongodb://localhost/db-test', options, () => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });
  });

  describe('User Sign Up', () => {
    it('should successfully sign up a user', async () => {
      const res = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send({
          ...mock.signup,
        });
      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal('Successfully signed up');
      expect(res.body.data.email).to.equal(mock.signup.email);
    });

    it('should not signup a user with the same email', async () => {
      const res = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send({
          ...mock.signup,
          password: 'NewMockPassword19',
        });
      expect(res.status).to.equal(409);
      expect(res.body.message).to.equal('User already exists');
    });
  });

  describe('User Sign In', () => {
    it('should successfully sign in a user', async () => {
      const res = await chai
        .request(app)
        .post(`${baseUrl}/auth/signin`)
        .send({
          ...mock.signup,
        });
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Successfully signed in');
      expect(res.body.data.email).to.equal(mock.signup.email);
    });

    it('should not in a non-existing user', async () => {
      const res = await chai
        .request(app)
        .post(`${baseUrl}/auth/signin`)
        .send({
          email: 'newemail@email.com',
          password: 'NewMockPassword19',
        });
      expect(res.status).to.equal(401);
      expect(res.body.message).to.equal('Incorrect Credentials');
    });
  });
});
