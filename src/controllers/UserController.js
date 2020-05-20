const express = require('express');

const UserServices = require('../services/UserServices');
const schemasValidations = require('../helpers/schemas/validations');
const authorizationMiddleware = require('../middlewares/authorization');

const router = express.Router();

router.post('/', [
  ...schemasValidations.getBodySchemas([
    'first_name',
    'last_name',
    'email',
    'password',
  ]),
], UserServices.createUser);

router.post('/auth', [
  ...schemasValidations.getBodySchemas([
    'email',
    'password',
  ]),
], UserServices.authUser);

router.put('/', [
  authorizationMiddleware,

  ...schemasValidations.getBodySchemas([
    'first_name',
    'last_name',
    'email',
    'password',
  ]),
], UserServices.updateUser);

module.exports = router;
