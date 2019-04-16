//服务器报错模块
var createError = require('http-errors');

var express = require('express');
//path核心模块
var path = require('path');
//解决的cookie的模块
var cookieParser = require('cookie-parser');
//日志模块
var logger = require('morgan');

//index路由
var indexRouter = require('./routes/index');
//users路由
var usersRouter = require('./routes/users');
//
var app = express();

//path.join(参数1,参数2)    生成一个绝对路径   __dirname  当前文件夹的绝对路径
app.set('views', path.join(__dirname, 'views'));
// 所用到的模板引擎是ejs模板引擎
app.set('view engine', 'ejs');

//使用模块  中间件  请求req和回复res之间的一个应用  
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next()  使用下一个中间件
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


/*
  自己看一下express

  2、看express中间件的意思   next()
  3、前后端分离  与  不分离
  4、报文
  
  5、http https   TCP的三次握手四次挥手


  写博客

*/