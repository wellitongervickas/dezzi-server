const { validationResult } = require('express-validator');

const {
  errorsParse,
} = require('../api/response');

const fn = () => {};

const handlerService = (req, res, cb = fn) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json(errorsParse(errors.array()));
    }

    cb();
  } catch (error) {
    return res.status(500).send();
  }
};

module.exports = {
  handlerService,
};
