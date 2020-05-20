const express = require('express');

const BillingServices = require('../services/BillingServices');
const schemasValidations = require('../helpers/schemas/validations');
const authorizationMiddleware = require('../middlewares/authorization');

const router = express.Router();

router.post('/:contact_uuid', [
  authorizationMiddleware,

  ...schemasValidations.getParamSchemas([
    'contact_uuid',
  ]),

  ...schemasValidations.getBodySchemas([
    'value',
  ]),
], BillingServices.createBilling);

router.get('/:contact_uuid', [
  authorizationMiddleware,

  ...schemasValidations.getParamSchemas([
    'contact_uuid',
  ]),
], BillingServices.index);

router.get('/:contact_uuid/:uuid', [
  authorizationMiddleware,

  ...schemasValidations.getParamSchemas([
    'contact_uuid',
    'uuid',
  ]),
], BillingServices.getBilling);

router.put('/:contact_uuid/:uuid', [
  authorizationMiddleware,

  ...schemasValidations.getParamSchemas([
    'contact_uuid',
    'uuid',
  ]),

  ...schemasValidations.getBodySchemas([
    'value',
  ]),
], BillingServices.updateBilling);

router.delete('/:contact_uuid/:uuid', [
  authorizationMiddleware,

  ...schemasValidations.getParamSchemas([
    'contact_uuid',
    'uuid',
  ]),
], BillingServices.deleteBilling);

module.exports = router;
