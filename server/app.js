var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var productRouter = require('./routes/products');
var categoryRouter = require('./routes/categories');
var cartRouter = require('./routes/cart');
var orderRouter = require('./routes/order');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', config.AccessControlAllowOrigin);
  res.header('Access-Control-Allow-Headers', config.AccessControlAllowHeaders);
  // in case of options request/preflight
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', config.AccessControlAllowMethods);
      return res.status(200).json({});
  }
  next();
});

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'upload')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/carts', cartRouter);
app.use('/orders', orderRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
