const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('Comment Service', () => {
  let authToken;
  let blogId;

  beforeAll(async () => {
    // Login to get token
    const response = await request('http://localhost:3001')
      .post('/api/auth/login')
      .send({
        email: 'zaim.k.abbasi@gmail.com',
        password: 'zaim@123'
      });
    
    authToken = response.body.token;
    blogId = 'test-blog-id'; // Use a test blog ID
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('this test should create a comment with valid token', async () => {
    const response = await request(app)
      .post('/api/comments')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        blogId,
        content: 'Test Comment'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Comment added successfully');
  });

  test('this test should fail to create comment without token', async () => {
    const response = await request(app)
      .post('/api/comments')
      .send({
        blogId,
        content: 'Test Comment'
      });

    expect(response.status).toBe(401);
  });
});