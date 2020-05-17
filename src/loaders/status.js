const statusLoader = {
  init: (app) => {
    app.get('/status', (_req, res) => res.status(200).end());
    app.head('/status', (_req, res) => res.status(200).end());

    app.enable('trust proxy');

    return app;
  }
};

module.exports = statusLoader;
