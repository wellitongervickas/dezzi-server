const express = require('express');
const loaders = require('./loaders');

const app = express();

async function loadSettings() {
  await loaders({ app });
}

loadSettings();

module.exports = app;
