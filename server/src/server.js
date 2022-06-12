const dotenv = require('dotenv');
const winston = require('winston');
const app = require('./app');

dotenv.config();

const port = process.env.LISTEN_PORT || 4000;

app.listen(port, () => {
  winston.info(`Listening on port ${port}`);
});
