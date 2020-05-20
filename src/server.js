const app = require('./app');

const host = process.env.APP_URL || 'localhost';
const port = process.env.PORT || 3000;

async function startServer() {
  app.listen(port, (err) => {
    if (err) {
      throw(err);
    }

    console.log(`App running on: http://${host}:${port}`);
  });
};

startServer();
