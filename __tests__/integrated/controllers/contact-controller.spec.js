const faker = require('faker');
const supertest = require('supertest');
const app = require('../../../src/app');
const conn = require('../../../src/database/conn');

const request = supertest(app);

describe('Controller Contact', () => {
  beforeAll(async () => {
    await conn.migrate.rollback();
    await conn.migrate.latest();
  });

  let createdContact = {};
  let result = {};

  it('should create a contact', async done => {
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
        result = res.body;
      });

    const contact = {
      first_name: 'felipe',
      last_name: 'barcelos',
      phone: '+5545995853386',
      email: 'joaob2@hotmail.com',
    };

    await request.post('/contacts')
      .set('authorization', `Bearer ${result.token}`)
      .send(contact)
      .then((res) => {
        expect(res.status).toBe(201);
        createdContact = res.body;
      });

    done();
  });

  it('should get a exists contact', async done => {
    await request.get(`/contacts/${createdContact.uuid}`)
    .set('authorization', `Bearer ${result.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(createdContact);
    });

    done();
  });

  it('should update a exist contact', async done => {
    const newContactValues = {
      first_name: 'joão',
      last_name: 'miguel',
      phone: '+5545995853386',
      email: 'joaob3@hotmail.com',
    };

    await request.put(`/contacts/${createdContact.uuid}`)
      .set('authorization', `Bearer ${result.token}`)
      .send(newContactValues)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject(newContactValues);
      });

    done();
  });

  it('should list all contacts', async done => {
    await request.get('/contacts')
      .set('authorization', `Bearer ${result.token}`)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject([{
          first_name: 'joão',
          last_name: 'miguel',
          phone: '+5545995853386',
          email: 'joaob3@hotmail.com',
        }]);
      });

    done();
  });

  it('should delete a exist contact', async done => {
    await request.delete(`/contacts/${createdContact.uuid}`)
      .set('authorization', `Bearer ${result.token}`)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.uuid).toBe(createdContact.uuid);
      });

    done();
  });
});
