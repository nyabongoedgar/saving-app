const dotenv = require("dotenv");
const app = require("./app");
const winston = require("winston");

dotenv.config();

const port = process.env.LISTEN_PORT || 4000;

app.listen(port, () => {
  winston.info(`Listening on port ${port}`);
});
