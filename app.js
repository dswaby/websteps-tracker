var express = require('express');
var http = require('http');
var path = require('path');
var connect        = require('connect')
var middleware = require('./source/middleware');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var methodOverride  = require("method-override");
var mongoose = require('mongoose');
var compression = require('compression');
var errorHandler = require('errorhandler');
var passport = require('passport');
var expressSession = require('express-session');

var app = express();

// config
app.use(middleware.cors());
app.use(bodyParser.json());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 8080);
bodyParser({limit: '100mb'});
//cors middleware and body parser for 



// passport config fot auth
app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(methodOverride());

// setup/config for mongoose connection
var dbName='fitpicDB';
var connectionString='mongodb://localhost:27017/'+dbName;
mongoose.connect(connectionString);

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(middleware.serveMaster.development());
}

if (process.env.NODE_ENV === 'production') {
  app.use(errorHandler());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(middleware.serveMaster.production());
};

// endpoinds
require('./source/api/auth')(app);
require('./source/api/emails')(app);
require('./source/api/contacts')(app);
require('./source/api/tasks')(app);
require('./source/api/fitbit')(app);
require('./source/api/admin')(app);


app.listen(app.get('port'), function() {
  var environment = process.env.NODE_ENV || 'development';
  console.log('SPA boilerplate started: ' + app.get('port') + ' (' + environment + ')');
});
 