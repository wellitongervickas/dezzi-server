
const faker = require('faker');
const supertest = require('supertest');
const app = require('../../../src/app');
const conn = require('../../../src/database/conn');

const jwt = require('../../../src/helpers/api/jwt');
const authorizationMiddleware = require('../../../src/middlewares/authorization');

const request = supertest(app);

process.env = {
  SERVER_TOKEN_SECRET: '1234',
  SERVER_TOKEN_EXPIRES: '86400000',
};

const fn = jest.fn();

let mockRequest = {
  headers: {},
}

const mockResponse = {
  send: function(r) {
    return r
  },
  json: function(r) {
    return r
  },
  status: function() {
    return this;
  }
};

describe('Middleware Authorization', () => {
  beforeAll(async () => {
    await conn.migrate.rollback();
    await conn.migrate.latest();
  });

  it('should be defined', () => {
    expect(authorizationMiddleware).toBeDefined();
  });

  it('should have undefined response when request is authenticated', async (done) => {
    const user = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      password: faker.internet.password(8),
      email: faker.internet.email(),
    };

    let result = {};

    await request.post('/users')
      .send(user)
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body.token).not.toBeNull();
        result = res.body;
      });

    const newMockRequest = {
      ...mockRequest,
      headers: {
        authorization: `Bearer ${result.token}`,
      }
    };

    const response = await authorizationMiddleware(newMockRequest, mockResponse, fn);
    expect(response).toBe(undefined);
    expect(fn).toHaveBeenCalledTimes(1)

    expect(newMockRequest.authenticated).toMatchObject({
      uuid: result.user.uuid,
    });

    done();
  });

  it('should have error when missing authorization header', async () => {
    const response = await authorizationMiddleware(mockRequest, mockResponse, fn);

    expect(response).toEqual({
      errors: [{
        in: 'headers',
        param: 'authorization',
        message: 'User unauthorized',
      }],
    });
  });

  it('should have error when have empty authorization header', async () => {
    const response = await authorizationMiddleware({
      ...mockRequest,
      headers: {
        authorization: '',
      }
    }, mockResponse, fn);

    expect(response).toEqual({
      errors: [{
        in: 'headers',
        param: 'authorization',
        message: 'User unauthorized',
      }],
    });
  });

  it('should have error when have wrong authorization header', async () => {
    const response = await authorizationMiddleware({
      ...mockRequest,
      headers: {
        authorization: 'test',
      }
    }, mockResponse, fn);

    expect(response).toEqual({
      errors: [{
        in: 'headers',
        param: 'authorization',
        message: 'User unauthorized',
      }],
    });
  });

  it('should have error when have empty authorization header bearer token', async () => {
    const response = await authorizationMiddleware({
      ...mockRequest,
      headers: {
        authorization: 'Bearer',
      }
    }, mockResponse, fn);

    expect(response).toEqual({
      errors: [{
        in: 'headers',
        param: 'authorization',
        message: 'User unauthorized',
      }],
    });
  });

  it('should have error when have wrong authorization header bearer token', async () => {
    const response = await authorizationMiddleware({
      ...mockRequest,
      headers: {
        authorization: 'Bearer notokenprovided',
      }
    }, mockResponse, fn);

    expect(response).toEqual({
      errors: [{
        in: 'headers',
        param: 'authorization',
        message: 'User unauthorized',
      }],
    });
  });
});
