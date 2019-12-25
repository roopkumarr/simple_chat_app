var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var messagesRouter = require('./routes/messaging');

var app = express();
var server = require('http').Server(app); // intantiating the server
var io = require('socket.io')(server); // instantiating the socket

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost/chat_app", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the mongoDB at mongodb://localhost/chat_app (DataBase)');
  })
  .catch(err => {
    console.log('falied to connect to MongoDB...', err);
    process.exit();
  });

// this function is called every time before any api gets call 
// this function is created for socket io function invocation in required api 
app.use(function (req, res, next) {
  res.io = io;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/message_api', messagesRouter);

// gets invoked when a user is opens the page
io.on('connection', () => {
  console.log('A user is connected')
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
module.exports = { app: app, server: server }; //since we want to export both server and app to be used in the www