const jwt = require('jsonwebtoken');

const decode = token => jwt.decode(token, process.env.SERVER_TOKEN_SECRET, (err, decoded) => {
  return err ? null : decoded;
});

const generator = (params = {}) => jwt.sign(params, process.env.SERVER_TOKEN_SECRET, {
  expiresIn: process.env.SERVER_TOKEN_EXPIRES,
});

const extractor = (authorization) => {
  if ([null, undefined, ''].indexOf(authorization) === -1) {
    const bearer = authorization.split(' ');

    const [
      scheme,
      token,
    ] = bearer;

    if (['Bearer', 'bearer'].indexOf(scheme) > -1) {
      return token;
    }
  }

  return null;
};

module.exports = {
  extractor,
  generator,
  decode,
};
