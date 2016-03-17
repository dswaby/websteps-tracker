var config = require( './config' );
var express = require( 'express' );
var http = require( 'http' );
var path = require( 'path' );
var connect = require( 'connect' )
var middleware = require( './source/middleware' );
var bodyParser = require( 'body-parser' );
var favicon = require( 'serve-favicon' );
var methodOverride = require( "method-override" );
var mongoose = require( 'mongoose' );
var errorHandler = require( 'errorhandler' );
var expressSession = require( 'express-session' );
var app = express();
var server = require( 'http' ).createServer( app );

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'jade' );
app.set( 'port', config.port );


app.use( middleware.cors() );
app.use( favicon( __dirname + '/public/favicon.ico' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { limit: '50mb' } ) );
app.use( methodOverride() );
app.use( errorHandler() );
app.use( express.static( path.join( __dirname, 'public' ) ) );


mongoose.connect( config.mongodbConnectionString );

if ( process.env.NODE_ENV === 'production' ) {
	app.use( middleware.serveMaster.production() );
}

if ( process.env.NODE_ENV === 'development' ) {
	app.use( middleware.serveMaster.development() );
}

require( './source/api/path' )( app );
require( './source/api/ping' )( app );
require( './source/api/sockets' )( server );

server.listen( app.get( 'port' ), function() {
	var environment = process.env.NODE_ENV || 'development';
	console.log( 'localhost ' + app.get( 'port' ) + ' (' + environment + ')' );
} );
