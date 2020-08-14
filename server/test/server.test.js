const app = require('../server');
const testServer = require('supertest');

describe('Testing user routes', () => {
  test('Logout route should alwas respons with status 200', async () => {
    const response = await testServer(app).post('/api/user/logout');
    expect(response.statusCode).toBe(200);
  });

  test('User route should be protected - must be logged in', async () => {
    const response = await testServer(app).get('/api/user/');
    expect(response.statusCode).toBe(403);
  });

  test('User route should return user if logged in', async () => {
    const agent = testServer.agent(app);
    // agent is a way to associate all request together to one thing
    const loginResponse = await agent
      .post('/api/user/login')
      .send({ username: 'bruno', password: 1234 });
    expect(loginResponse.statusCode).toBe(200);

    const userResponse = await agent.get('/api/user/');
    expect(userResponse.statusCode).toBe(200);
    expect(userResponse.body.username).toBe('bruno');
    console.log('userResponse', userResponse);
  });
});
