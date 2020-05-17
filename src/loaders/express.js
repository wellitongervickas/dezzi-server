const express = require('express');
const compression = require('compression');
const cors = require('cors');
const dotEnv = require('dotenv');

const environments = require('../config/environments');

const expressLoader = {
  init: (app) => {
    dotEnv.config(environments);

    app.use(compression());
    app.use(cors());
    app.use(express.json());

    return app;
  }
};

module.exports = expressLoader;
