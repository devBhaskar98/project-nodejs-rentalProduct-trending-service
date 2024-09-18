// test/default.test.js
import request from 'supertest';
import app from '../src/app.js'; // Make sure to include the .js extension

describe('GET /health/check', () => {
  it('should respond with a greeting message', async () => {
    const response = await request(app).get('/health/check');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('App is Healthy!!!');
  });
});
