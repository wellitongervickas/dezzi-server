const supertest = require('supertest');
const app = require('../../../src/app');

const request = supertest(app);

describe('Loaders Status', () => {
  it('should be got status 200', async done => {
    await request.get('/status')
      .send()
      .then((res) => {
        expect(res.status).toBe(200);
      });

    done();
  });
});
