const app = require('./app');

async function startServer() {
  app.listen(process.env.SERVER_PORT || 3000, process.env.SERVER_HOST || 'localhost', (err) => {
    if (err) {
      throw(err);
    }

    console.log(`App running on: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
  });
};

startServer();
