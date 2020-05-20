const expressLoader = require('./express');
const statusLoader = require('./status');
const routesLoader = require('./routes');

module.exports = async ({ app }) => {
  await expressLoader.init(app);
  await statusLoader.init(app);
  await routesLoader.init(app);
};
