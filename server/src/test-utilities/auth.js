/* eslint-disable no-param-reassign */
const request = require('supertest');
const app = require('../app');

const registerUser = async () => {
  await request(app).post('/api/users/register').send({
    email: 'test@gmail.com',
    password: 'test',
    username: 'test',
  });
};

const login = async (auth) => {
  const response = await request(app).post('/api/users/authenticate').send({
    email: 'test@gmail.com',
    password: 'test',
  });
  auth.token = response.body.token;
};

module.exports = {
  registerUser,
  login,
};
