const faker = require('faker');
const supertest = require('supertest');
const app = require('../../../src/app');
const conn = require('../../../src/database/conn');

const request = supertest(app);

describe('Controller Billing', () => {
  beforeAll(async () => {
    await conn.migrate.rollback();
    await conn.migrate.latest();
  });

  let createdUser = {};
  let createdContact = {};
  let createdBilling = {};

  it('should create a billing', async done => {
    const user = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      password: faker.internet.password(8),
      email: faker.internet.email(),
    }

    await request.post('/users')
      .send(user)
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body.token).not.toBeNull();
        createdUser = res.body;
      });

    const contact = {
      first_name: 'felipe',
      last_name: 'barcelos',
      phone: '+5545995853386',
      email: 'joaob2@hotmail.com',
    };

    await request.post('/contacts')
      .set('authorization', `Bearer ${createdUser.token}`)
      .send(contact)
      .then((res) => {
        expect(res.status).toBe(201);
        createdContact = res.body;
      });

    const billing = {
      value: 'R$ 200,00',
    };

    await request.post(`/billings/${createdContact.uuid}`)
      .set('authorization', `Bearer ${createdUser.token}`)
      .send(billing)
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body.value).toBe(20000);
        createdBilling = res.body;
      });

    done();
  });

  it('should get a exists billing', async done => {
    await request.get(`/billings/${createdContact.uuid}/${createdBilling.uuid}`)
    .set('authorization', `Bearer ${createdUser.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.value).toBe(20000);
    });

    done();
  });

  it('should update a exists billing', async done => {
    const newValue = {
      value: 'R$ 300,00'
    };

    await request.put(`/billings/${createdContact.uuid}/${createdBilling.uuid}`)
    .send(newValue)
    .set('authorization', `Bearer ${createdUser.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.value).toBe(30000);
    });

    done();
  });

  it('should list all billings', async done => {
    await request.get(`/billings/${createdContact.uuid}`)
    .set('authorization', `Bearer ${createdUser.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject([{
        value: 30000,
      }]);
    });

    done();
  });

  it('should delete a exists billing', async done => {
    await request.delete(`/billings/${createdContact.uuid}/${createdBilling.uuid}`)
    .set('authorization', `Bearer ${createdUser.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.uuid).toBe(createdBilling.uuid);
    });

    done();
  });
});
