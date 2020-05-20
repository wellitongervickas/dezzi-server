const bcrypt = require('bcryptjs');
const uuid = require('uuid').v1;

const User = {
  create: async (user) => [null, undefined].indexOf(user) > -1 ? {} : ({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: await bcrypt.hash(user.password || '', 10),
    uuid: user.uuid || uuid(),
  }),

  SchemaValidation: {
    password: {
      min: 8,
      max: 16,
    }
  },
};

module.exports = User;
