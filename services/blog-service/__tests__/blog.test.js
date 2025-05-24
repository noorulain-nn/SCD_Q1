const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('Blog Service', () => {
  let authToken;

  beforeAll(async () => {
    // Login to get token
    const response = await request('http://localhost:3001')
      .post('/api/auth/login')
      .send({
        email: 'zaim.k.abbasi@gmail.com',
        password: 'zaim@123'
      });
    
    authToken = response.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('this test should create a blog post with valid token', async () => {
    const response = await request(app)
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Blog',
        content: 'Test Content'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Blog created successfully');
  });

  test('this test should fail to create blog without token', async () => {
    const response = await request(app)
      .post('/api/blogs')
      .send({
        title: 'Test Blog',
        content: 'Test Content'
      });

    expect(response.status).toBe(401);
  });
});