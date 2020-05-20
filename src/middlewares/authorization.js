const UserServices = require('../services/UserServices');
const jwt = require('../helpers/api/jwt');

const errors = require('../config/constants/errors');

const {
  errorsParse,
} = require('../helpers/api/response');

const defaultUnauthorizedError = errorsParse([{
  msg: errors.USER_UNAUTHORIZED,
  param: 'authorization',
  location: 'headers',
}]);

const authorizationMiddleware = async (req, res, next) => {
  try {
    const {
      authorization,
    } = req.headers;

    const bearer = authorization ? authorization.split(' ') : [];

    if (bearer.length !== 2) {
      return res.status(401).json(defaultUnauthorizedError);
    }

    const [
      scheme,
      token,
    ] = bearer;

    const decoded = jwt.decode(token);

    if (!/^Bearer$/i.test(scheme) || (!decoded || !decoded.uuid)) {
      return res.status(401).json(defaultUnauthorizedError);
    }

    await UserServices.findUserByUUID(decoded.uuid)
      .then(user => {
        if (!user) {
          return res.status(401).json({
            msg: errors.USER_NOT_EXISTS,
            param: 'authorization',
            location: 'headers',
          });
        }

        req.authenticated = {
          ...user,
        };
      });

    return next();
  } catch (error) {
    return res.status(500).send();
  }
};

module.exports = authorizationMiddleware;
