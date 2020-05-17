const express = require('express');

const ContactServices = require('../services/ContactServices');
const authorizationMiddleware = require('../middlewares/authorization');
const schemasValidations = require('../helpers/schemas/validations');

const router = express.Router();

router.get('/', [
  authorizationMiddleware,
], ContactServices.index);

router.get('/:uuid', [
  authorizationMiddleware,

  ...schemasValidations.getParamSchemas([
    'uuid',
  ]),
], ContactServices.getContact);

router.put('/:uuid', [
  authorizationMiddleware,

  ...schemasValidations.getParamSchemas([
    'uuid',
  ]),

  ...schemasValidations.getBodySchemas([
    'first_name',
    'last_name',
    'phone',
    'email',
  ]),
], ContactServices.updateContact);

router.post('/', [
  authorizationMiddleware,

  ...schemasValidations.getBodySchemas([
    'first_name',
    'last_name',
    'phone',
    'email',
  ]),
], ContactServices.createContact);

router.delete('/:uuid', [
  authorizationMiddleware,

  ...schemasValidations.getParamSchemas([
    'uuid',
  ]),
], ContactServices.deleteContact);

module.exports = router;
