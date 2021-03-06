const dotenv = require('dotenv');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const { cleanUsersModel } = require('../test-utilities/cleanup');

dotenv.config();

describe('test api', () => {
  afterAll(async () => {
    await cleanUsersModel();
    mongoose.connection.close();
  });

  it('creates a new user', async () => {
    const response = await request(app).post('/api/v1/users/register').send({
      email: 'test@gmail.com',
      password: 'password',
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('User created successfully');
  });

  it('fails to create a user with a missing password', async () => {
    const response = await request(app).post('/api/v1/users/register').send({
      email: 'test@gmail.com',
    });
    expect(response.statusCode).toBe(400);
  });

  it('logins in a new user', async () => {
    const response = await request(app).post('/api/v1/users/authenticate').send({
      email: 'test@gmail.com',
      password: 'password',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeTruthy();
  });

  it('fails to login with invalid credentials', async () => {
    const response = await request(app).post('/api/v1/users/authenticate').send({
      email: 'test@gmail.com',
      password: 'password2020',
    });
    expect(response.statusCode).toBe(400);
  });
});
