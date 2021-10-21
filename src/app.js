const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
//to allow cros origin call to server
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
//body parser
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  });
});

app.use('/api/v1', api);

//app.use(middlewares.notFound);
//app.use(middlewares.errorHandler);

module.exports = app;
