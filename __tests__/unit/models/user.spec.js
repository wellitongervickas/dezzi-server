const bcrypt = require('bcryptjs');
const validator = require('validator');
const uuid = require('uuid').v1;

const User = require('../../../src/models/User');

describe('Models User', () => {
  it('should be defined', () => {
    expect(User).toBeDefined();
    expect(User.create).toBeDefined();
    expect(User.SchemaValidation).toBeDefined();
  });

  it('should have empty object with empty props', async () => {
    expect(await User.create()).toEqual({});
    expect(await User.create(null)).toEqual({});
    expect(await User.create(undefined)).toEqual({});
  });

  it('should create User model', async () => {
    const user = {
      first_name: 'Welliton',
      last_name: 'Gervickas',
      email: 'wellitogervickas@gmail.com',
    };

    const password = '123456789';

    const createdUser = await User.create({
      ...user,
      password,
    });

    expect(createdUser).toMatchObject(user);
    expect(validator.isUUID(createdUser.uuid)).toBe(true);

    const matchedPass = await bcrypt.compare(password, createdUser.password);
    expect(matchedPass).toBe(true);
  });

  it('should create User Model with exists uuid', async () => {
    const user = {
      first_name: 'Welliton',
      last_name: 'Gervickas',
      email: 'wellitogervickas@gmail.com',
      password: '1223415',
      uuid: uuid(),
    };

    const createdUser = await User.create(user);
    expect(validator.isUUID(createdUser.uuid)).toBe(true);
    expect(createdUser.uuid).toBe(user.uuid);
  });

  it('should have schema validation password', () => {
    expect(User.SchemaValidation).toMatchObject({
      password: {
        min: 8,
        max: 16,
      },
    });
  });
});
