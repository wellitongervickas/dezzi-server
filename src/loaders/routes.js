const routes = require('../routes');

const routesLoader = {
  init: (app) => {
    routes(app);

    return app;
  }
};

module.exports = routesLoader;
