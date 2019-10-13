import request from 'supertest';
import app from '../../app';
import baseUrl from './utils/baseUrl';
import mock from './utils/mock';

beforeAll(async () => {
  jest.setTimeout(10000);
});

describe('User Sign Up', () => {
  it('should successfully sign up a user', async () => {
    const res = await request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        ...mock.signup1,
      });
    expect(res.body.status).toEqual(201);
    expect(res.body.message).toEqual('Successfully signed up');
    expect(res.body.data.email).toEqual(mock.signup1.email);
  });

  it('should not signup a user with the same email', async () => {
    const res = await request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        ...mock.signup1,
        password: 'NewMockPassword19',
      });
    expect(res.body.status).toEqual(409);
    expect(res.body.message).toEqual('User already exists');
  });
});

describe('User Sign In', () => {
  it('should successfully sign in a user', async () => {
    const res = await request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({
        ...mock.signup1,
      });
    expect(res.body.status).toEqual(200);
    expect(res.body.message).toEqual('Successfully signed in');
    expect(res.body.data.email).toEqual(mock.signup1.email);
  });

  it('should not sign in a non-existing user', async () => {
    const res = await request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({
        email: 'newemail@email.com',
        password: 'NewMockPassword19',
      });
    expect(res.body.status).toEqual(401);
    expect(res.body.message).toEqual('Incorrect Credentials');
  });
});
