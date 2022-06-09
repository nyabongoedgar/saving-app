const dotenv = require('dotenv');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const {
  cleanUsersModel,
  cleanSavingsModel,
} = require('../test-utilities/cleanup');
const { registerUser, login } = require('../test-utilities/auth');

dotenv.config();

describe('test savings api', () => {
  const auth = {};
  beforeAll(async () => {
    await registerUser();
    await login(auth);
  });

  afterAll(async () => {
    await cleanUsersModel();
    await cleanSavingsModel();
    mongoose.connection.close();
  });

  it('creates a saving', async () => {
    const response = await request(app)
      .post('/api/savings')
      .set('Authorization', `Bearer ${auth?.token}`)
      .send({
        amount: 1000,
        date: new Date(),
        description: "today's saving",
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.saving).toHaveProperty('amount');
  });

  it('fails to create a saving for yesterday or past date', async () => {
    const response = await request(app)
      .post('/api/savings')
      .set('Authorization', `Bearer ${auth?.token}`)
      .send({
        amount: 1000,
        date: new Date('2022-06-08T23:59:59.999Z'),
        description: 'past date saving',
      });
    expect(response.statusCode).toBe(400);
  });

  it('fails to create a saving for tommorrow', async () => {
    const ms = new Date(new Date().setHours(0, 0, 0, 0)).getTime() + 172800000;
    const tomorrow = new Date(ms);
    const response = await request(app)
      .post('/api/savings')
      .set('Authorization', `Bearer ${auth?.token}`)
      .send({
        amount: 1000,
        date: tomorrow,
        description: 'saving for tomorrow',
      });
    expect(response.statusCode).toBe(400);
  });
});
