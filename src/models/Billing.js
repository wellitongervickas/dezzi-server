const uuid = require('uuid').v1;
const {
  demonetization,
} = require('../helpers/sanitizers/monetization');

const Billing = {
  create: (billing) => [null, undefined].indexOf(billing) > -1 ? {} : ({
    value: demonetization(billing.value),
    uuid: billing && billing.uuid || uuid(),
  }),
};

Object.freeze(Billing);

module.exports = Billing;
