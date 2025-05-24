const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('Profile Service', () => {
  let authToken;
  let otherUserToken;

  beforeAll(async () => {
    // Login to get tokens
    const response1 = await request('http://localhost:3001')
      .post('/api/auth/login')
      .send({
        email: 'zaim.k.abbasi@gmail.com',
        password: 'zaim@123'
      });
    
    const response2 = await request('http://localhost:3001')
      .post('/api/auth/login')
      .send({
        email: 'abbasi.zaim@gmail.com',
        password: 'abbasi@123'
      });
    
    authToken = response1.body.token;
    otherUserToken = response2.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('this test should fail to fetch profile without token', async () => {
    const response = await request(app)
      .get('/api/profiles');

    expect(response.status).toBe(401);
  });

  test('this test should fail to update another user\'s profile', async () => {
    const response = await request(app)
      .put('/api/profiles')
      .set('Authorization', `Bearer ${otherUserToken}`)
      .send({
        bio: 'Unauthorized update attempt'
      });

    expect(response.status).toBe(403);
  });
});