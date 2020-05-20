const validator = require('validator');
const uuid = require('uuid').v1;

const Contact = require('../../../src/models/Contact');

describe('Models Contact', () => {
  it('should be defined', () => {
    expect(Contact).toBeDefined();
    expect(Contact.create).toBeDefined();
  });

  it('should have empty object with empty props', async () => {
    expect(Contact.create()).toEqual({});
    expect(Contact.create(null)).toEqual({});
    expect(Contact.create(undefined)).toEqual({});
  });

  it('should create Contact model', () => {
    const contact = {
      first_name: 'Welliton',
      last_name: 'Gervickas',
      email: 'wellitogervickas@gmail.com',
      phone: '+55995853386'
    };

    const createdContact = Contact.create(contact);

    expect(createdContact).toMatchObject(contact);
    expect(validator.isUUID(createdContact.uuid)).toBe(true);
  });

  it('should create Contact Model with exists uuid', () => {
    const contact = {
      first_name: 'Welliton',
      last_name: 'Gervickas',
      email: 'wellitogervickas@gmail.com',
      uuid: uuid(),
    };

    const createdContact = Contact.create(contact);
    expect(validator.isUUID(createdContact.uuid)).toBe(true);
    expect(createdContact.uuid).toBe(contact.uuid);
  });
});
