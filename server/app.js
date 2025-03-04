var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require('./routes/admin/UserRouter');
const MenberRouter = require('./routes/admin/MemberRouter');
const ActivityRouter = require('./routes/admin/ActivityRouter');
const JWT = require('./util/JWT');
const MemberLevelRouter = require('./routes/admin/MemberLevelRouter');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  // 跳过登录接口，允许未授权的用户访问登录接口
  if (req.url === "/adminapi/user/login") {
    next()
    return;
  }
  // 从请求头中提取token
  const token = req.headers["authorization"].split(" ")[1]
  // 如果token存在，尝试验证token的有效性
  if (token) {
    // 验证token，并获取payload
    let payload = JWT.verify(token)
    // console.log(payload);
    // 如果token验证成功，生成一个新的token并设置到响应头中
    if (JWT.verify(token)) {
      const newToken = JWT.generate({
        id: payload.id,
        username: payload.username
      }, "1d")
      res.setHeader("Authorization", newToken)
      res.setHeader("Access-Control-Expose-Headers", "Authorization")
      next()
    } else {
      // 如果token验证失败，返回401错误
      res.status(401).send({
        code: "-1",
        message: "token过期"
      })
    }
  }
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(UserRouter)
app.use(ActivityRouter)
app.use(MenberRouter)
app.use(MemberLevelRouter)

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

module.exports = app;
