const { validationResult } = require('express-validator');

const conn = require('../database/conn');
const Billing = require('../models/Billing');

const {
  errorsParse,
} = require('../helpers/api/response');

const {
  USER_UNAUTHORIZED,
  BILLING_NOT_EXISTS,
} = require('../config/constants/errors');

const {
  handlerService,
} = require('../helpers/services/handler');

const BillingServices = {
  /**
   * @name index
   *
   * @param { string } contact_uuid contact uuid
   *
   * @returns Billings
   *
   * @public
   */

  index: (req, res) => {
    return handlerService(req, res, async () => {
      const { uuid } = req.authenticated;
      const { contact_uuid } = req.params;

      await BillingServices.getBillingsByContactUUID(contact_uuid, uuid)
        .then((billings) => {
          return res.json(billings.map(billing => Billing.create(billing)))
        });
    });
  },

  /**
   * @name getBilling
   *
   * @param { string } contact_uuid contact uuid
   * @param { string } uuid billing  uuid
   *
   * @returns Billing
   *
   * @public
   */


  getBilling: (req, res) => {
    return handlerService(req, res, async () => {
      const user_uuid = req.authenticated.uuid;
      const { contact_uuid, uuid } = req.params;

      await BillingServices.getBillingByUUID(req, res, contact_uuid, user_uuid, uuid)
        .then((biling) => {
          return res.json(Billing.create(biling));
        });
    });
  },

  /**
   * @name updateBilling
   *
   * @param { string } contact_uuid contact uuid
   * @param { string } uuid billing  uuid
   *
   * @returns Billing
   *
   * @public
   */

  updateBilling: (req, res) => {
    return handlerService(req, res, async () => {
      const user_uuid = req.authenticated.uuid;
      const { contact_uuid, uuid } = req.params;

      await BillingServices.getBillingByUUID(req, res, contact_uuid, user_uuid, uuid)
        .then(async () => {
          const billing = Billing.create({
            ...req.body,
            uuid,
          });

          await conn('billings')
            .where({ uuid })
            .update({ ...billing })
            .then(() => {
              return res.json(billing);
            });
        });
    });
  },

  /**
   * @name createBilling
   *
   * @param { string } contact_uuid contact uuid
   *
   * @returns Billing
   *
   * @public
   */

  createBilling: async (req, res) => {
    return handlerService(req, res, async () => {
      const BillingModel = Billing.create(req.body);

      await conn('billings')
        .insert({
          ...BillingModel,
          user_uuid: req.authenticated.uuid,
          contact_uuid: req.params.contact_uuid,
        })
        .then(() => res.status(201).json(BillingModel));
    });
  },

  /**
   * @name deleteBilling
   *
   * @param { string } contact_uuid contact uuid
   * @param { string } uuid billing  uuid
   *
   * @returns uuid
   *
   * @public
   */

  deleteBilling: (req, res) => {
    return handlerService(req, res, async () => {
      const user_uuid = req.authenticated.uuid;
      const { contact_uuid, uuid } = req.params;

      await BillingServices.getBillingByUUID(req, res, contact_uuid, user_uuid, uuid)
        .then(async () => {
          await conn('billings').where({ uuid }).delete().then(() => {
            return res.json({ uuid });
          });
        });
    });
  },

  /**
   * @name getBillingByUUID
   *
   * @param { string } contact_uuid contact uuid
   * @param { string } user_uuid user uuid
   * @param { string } uuid billing  uuid
   *
   * @returns billing
   *
   * @public
   */

  getBillingByUUID: async (req, res, contact_uuid, user_uuid, uuid) => await conn('billings')
    .where({ contact_uuid, user_uuid, uuid })
    .first()
    .then((billing) => {
      if (!billing) {
        return res.status(404).send(errorsParse([{
          msg: BILLING_NOT_EXISTS,
          param: 'uuid',
          location: 'params',
        }]));
      }

      if (billing.user_uuid !== req.authenticated.uuid) {
        return res.status(401).json(errorsParse([{
          msg: USER_UNAUTHORIZED,
          param: 'headers',
          location: 'authorization',
        }]));
      }

      return billing;
    }),

  /**
   * @name getBillingsByContactUUID
   *
   * @param { string } contact_uuid contact uuid
   * @param { string } user_uuid user uuid
   *
   * @returns Billings
   *
   * @public
   */

  getBillingsByContactUUID: async (contact_uuid, user_uuid) => await conn('billings')
    .where({ contact_uuid, user_uuid })
    .select('*')
};

module.exports = BillingServices;
