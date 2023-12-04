// This is the main file for the backend

// import functionalities
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const cors = require('cors');
// allow using a .env file
require('dotenv').config(); //require the dotenv

// creates a new instance of express application
const app = express();

// add cors header to the server
app.use(
  cors({
    origin: '*'
  })
);

// suppress mongoose warning to prepare for new version
mongoose.set('strictQuery', false);

// sets up mongoose for the mongoDB connection
mongoose
  .connect(process.env.MONGO_URL || 'mongodb+srv://pachary2:Ahcraya12@cluster0.ayklcw6.mongodb.net/')
  .then(() => {
    console.log('Database connection Success!');
  })
  .catch((err) => {
    console.error('Mongo Connection Error', err);
  });

// declare port number for the api
const PORT = process.env.PORT || 3000;

// setup and access request body
app.use(express.json());
app.use(morgan('dev'));

// setup middle ware for routes
app.use('/clients', require('./routes/clients'));
app.use('/events', require('./routes/events'));
app.use('/org', require('./routes/org'));
app.use('/services', require('./routes/services'));
app.use('/users', require('./routes/users'));
//create a route for the uplode 
//create a uplode folder in mongodb
//create a uplode.js file that will save the photo to the folder in the db 
//create a uplode collection in api Documentation and publish the postman url

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// error handler
app.use(function (err, req, res, next) {
  // logs error and error code to console
  console.error(err.message, req);
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  res.status(err.statusCode).send(err.message);
});