const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("./config/mongoose");
const error = require("./middleware/error");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan");

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
// open mongoose connection
mongoose.connect();

app.use("/api/users", require("./routes/UserRouter"));

app.use("/api/savings", require("./routes/SavingsRouter"));

app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

app.listen(process.env.LISTEN_PORT || 3000, () => {
  console.log("Backend server is running on port:", process.env.LISTEN_PORT);
});

export default app;
