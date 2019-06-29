/** App use this express framework , mongoose database */
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const config = require('./database.js');

/** Router */
const userrouter = require('./route/user.route');
const loginrouter = require('./route/auth.route');
const tweetsrouter = require('./route/tweets.route');

/** Cors */
const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

/** Body-parser Use */
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/** Mongoose DataBase Connection */
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);

/** Use Router */
app.use('/', tweetsrouter);
app.use('/api/v1', loginrouter);
app.use('/user', userrouter)
app.listen(4000);

module.exports = app;