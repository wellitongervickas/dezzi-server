const validator = require('validator');
const uuid = require('uuid').v1;

const Billing = require('../../../src/models/Billing');

describe('Models Billing', () => {
  it('should be defined', () => {
    expect(Billing).toBeDefined();
    expect(Billing.create).toBeDefined();
  });

  it('should have empty object with empty props', async () => {
    expect(Billing.create()).toEqual({});
    expect(Billing.create(null)).toEqual({});
    expect(Billing.create(undefined)).toEqual({});
  });

  it('should create Billing model', () => {
    const billing = {
      value: 'R$ 200,00',
    };

    const createdBilling = Billing.create(billing);

    expect(createdBilling).toMatchObject({
      value: 20000,
    });

    expect(validator.isUUID(createdBilling.uuid)).toBe(true);
  });

  it('should create Billing Model with exists uuid', () => {
    const billing = {
      value: 'R$ 200,00',
      uuid: uuid(),
    };

    const createdBilling = Billing.create(billing);
    expect(validator.isUUID(createdBilling.uuid)).toBe(true);
    expect(createdBilling.uuid).toBe(billing.uuid);
  });

  it('should return general values from billing model', () => {
    expect(Billing.create({ value: 'R$10.000,00' })).toMatchObject({ value: 1000000 });
    expect(Billing.create({ value: 'R$10,00' })).toMatchObject({ value: 1000 });
    expect(Billing.create({ value: '10,00' })).toMatchObject({ value: 1000 });
    expect(Billing.create({ value: '1000' })).toMatchObject({ value: 1000 });
    expect(Billing.create({ value: 1000 })).toMatchObject({ value: 1000 });
    expect(Billing.create({ value: 'x' })).toMatchObject({ value: 0 });
    expect(Billing.create({ value: 'x12' })).toMatchObject({ value: 12 });
  });
});
