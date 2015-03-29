var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var mongodbUri = process.env.MONGOLAB_URI || 'mongodb://localhost/CoffeeManager';
mongoose.connect(mongodbUri, function(err){
   if(err){
       console.log('Connection error', err);
   } else{
       console.log('Connection successful');
   }
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicons', 'favicon.ico')));


// Index configuration
var routes = require('./routes/index');
app.use('/', routes);

// Passport initialization
var passport = require('passport');
require('./config/passport.js')(passport);
app.use(passport.initialize());

// User API configuration
var usersRouter = express.Router();
require('./routes/users')(usersRouter, passport);
app.use('/api/users', usersRouter);

// Login API configuration
var loginRouter = require('./routes/login');
app.use('/api/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
