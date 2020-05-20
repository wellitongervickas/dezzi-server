const knex = require('knex');
const config = require('../../knexfile');

const connection = knex(config[process.env.NODE_ENV]);

module.exports = connection;
