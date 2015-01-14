var config = require('./config');
var express = require('express');
var http = require('http');
var path = require('path');
var connect        = require('connect')
var middleware = require('./source/middleware');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var methodOverride  = require("method-override");
var mongoose = require('mongoose');
// var compression = require('compression');
var errorHandler = require('errorhandler');
var passport = require('passport');
var expressSession = require('express-session');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// config
app.use(middleware.cors());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('port', config.port);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({limit: '50mb' }));
app.use(methodOverride());

mongoose.connect(config.mongodbConnectionString);

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(middleware.serveMaster.development());
}

if (process.env.NODE_ENV === 'production') {
  // app.use(compression({
  //   threshold: 512})
  // );
  app.use(errorHandler());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(middleware.serveMaster.production());
};

// endpoinds
require('./source/api/auth')(app);
require('./source/api/emails')(app);
require('./source/api/contacts')(app);
require('./source/api/tasks')(app);
require('./source/api/pics')(app);
require('./source/api/glucose')(app);

var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(app.get('port'), function(){
  var environment = process.env.NODE_ENV || 'development';
  console.log('SPA boilerplate started: ' + app.get('port') + ' (' + environment + ')');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.broadcast.emit('user connected');
  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('get connection status', function (data) {
    socket.broadcast.emit('is danny connected');
  });

  socket.on('steps updated', function (data) {
    console.log('steps', data);
    socket.broadcast.emit('stepcount', {steps: data });
  });

  socket.on('danny is connected', function (data) {
    socket.broadcast.emit('danny is connected');
  });
});

