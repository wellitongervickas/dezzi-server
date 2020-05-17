const app = require('./app');

const port = process.env.PORT || 3000;
const host = process.env.APP_URL;

async function startServer() {
  app.listen(port, host, (err) => {
    if (err) {
      throw(err);
    }

    console.log(`App running on: http://${port}:${host}`);
  });
};

startServer();
