const express = require('express');
const cors = require('cors');

const app = express();
const morgan = require('morgan');
const mongoose = require('./config/mongoose');
const error = require('./middleware/error');

app.use(cors());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
// open mongoose connection
mongoose.connect();

app.use('/api/v1/users', require('./routes/UserRouter'));

app.use('/api/v1/savings', require('./routes/SavingsRouter'));

app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
