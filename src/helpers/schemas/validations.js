const {
  check,
  param,
} = require('express-validator');

const replaceText = require('../text/replace-text');
const errors = require('../../config/constants/errors');

const {
  SchemaValidation
} = require('../../models/User');

const passwordSchemas = {
  min: SchemaValidation.password.min,
  max: SchemaValidation.password.max,
};

const paramSchemas = {
  uuid: param('uuid')
    .notEmpty()
    .withMessage(errors.VALUE_REQUIRED),

  user_uuid: param('user_uuid')
    .notEmpty()
    .withMessage(errors.VALUE_REQUIRED),

  contact_uuid: param('contact_uuid')
    .notEmpty()
    .withMessage(errors.VALUE_REQUIRED),
}

const bodySchemas = {
  first_name: check('first_name')
    .notEmpty()
    .withMessage(errors.VALUE_REQUIRED),

  last_name: check('last_name')
    .notEmpty()
    .withMessage(errors.VALUE_REQUIRED),

  email: check('email')
    .isEmail()
    .withMessage(errors.EMAIL_VALID),

  phone: check('phone')
    .notEmpty()
    .withMessage(errors.VALUE_REQUIRED),

  password: check('password')
    .isLength(passwordSchemas)
    .withMessage(replaceText(errors.PASSWORD_LENGTH, passwordSchemas)),

  value: check('value')
    .notEmpty()
    .withMessage(errors.VALUE_REQUIRED),
}

const getSchemas = (validations = [] , schemas = {}) => {
  return Object.keys(schemas).reduce((acc, key) => {

    if (validations.find(item => item === key)) {
      acc.push(schemas[key]);
    }

    return acc;
  }, []);
};

const getParamSchemas = (validations = []) => getSchemas(validations, paramSchemas);

const getBodySchemas = (validations = []) => getSchemas(validations, bodySchemas);

module.exports = {
  bodySchemas,
  paramSchemas,
  getBodySchemas,
  getParamSchemas,
};
