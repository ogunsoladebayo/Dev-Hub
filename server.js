const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const dbconn = require('./config/db');
const errorHandler = require('./middleware/error');
// import bootcamps route
const bootcamps = require('./routes/bootcamps');

dotenv.config({ path: './config/config.env' });

dbconn();

const app = express();

// body parser
app.use(express.json());

// mount routers
app.use('/api/v1/bootcamps', bootcamps);

app.use(errorHandler);

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 3000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
// error handling
process.on('unhandledRejection', (err, promise) => {
  console.log(`An error ocuured... \n ERR: ${err.message}`.red);
  // Closing server and exiting application on error
  server.close(() => process.exit(1));
});
