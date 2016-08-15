'use strict'
const express         = require('express');
const path            = require('path');
const logger          = require('morgan');
const bodyParser      = require('body-parser');
const session         = require('express-session');
 // const passport        = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const homeRoute       = require('./routes/home');
const feedbackRoute   = require('./routes/feedback');
const request         = require('request');
 const app             = express();
const port            = process.env.PORT || 3000;
app.set('views',path.join(__dirname, 'views'));
const FACEBOOK_APP_ID = '1676993712624548';
const FACEBOOK_APP_SECRET = '7b8ef5afa71b0541ecc79fc65457b9a7';





app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));


 app.use(express.static(path.join(__dirname,'public')));


 app.use('/', homeRoute);
 app.use('/feedback', feedbackRoute);


app.listen(port, function() {
  console.log('Server is listening on ',port);
})
