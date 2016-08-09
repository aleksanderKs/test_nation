'use strict'
const express         = require('express');
const path            = require('path');
const logger          = require('morgan');
const bodyParser      = require('body-parser');
const session         = require('express-session');

const homeRoute       = require('./routes/home');
// const beerAPIRoute    = require('./routes/beer_api');
//const userRoute       = require('./routes/user');
const request         = require('request');
const app             = express();
const port            = process.env.PORT || 3000;
app.set('views',path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');

app.use(logger('dev'));


 app.use(express.static(path.join(__dirname,'public')));


 app.use('/', homeRoute);
// app.use('/api',beerAPIRoute);

// app.use('/user', userRoute);

app.listen(port, function() {
  console.log('Server is listening on ',port);
})
