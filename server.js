const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
// import bootcamps route
const bootcamps = require('./routes/bootcamps');

dotenv.config({ path: './config/config.env' });

const app = express();

// mount routers
app.use('/api/v1/bootcamps', bootcamps);

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
