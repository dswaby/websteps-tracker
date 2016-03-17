var _ = require( 'underscore' );
var client = require( './../client' );

function skipMaster( req ) {
	return _.any( [ '/api', '/components', '/css', '/js', '/build' ], function( url ) {
		return req.url.substr( 0, url.length ) === url;
	} );
}

function skipToAdmin( req ) {
	return _.any( [ '/admin' ], function( url ) {
		return req.url.substr( 0, url.length ) === url;
	} );
}

function hander( title, mainJs, mainCss ) {
	return function( req, res, next ) {
		if ( skipMaster( req ) ) {
			return next();
		}
		if ( skipToAdmin( req ) ) {
			res.render( 'admin', { title: title, mainJs: mainJs, mainCss: mainCss } );
		} else {
			res.render( 'master', { title: title, mainJs: mainJs, mainCss: mainCss } );
		}
	};
}

module.exports = {
	development: function() {
		return hander( 'Fitbit Evidence | Development', '/js/main.js', '/css/main.css' );
	},

	production: function() {
		console.log( client.js );
		return hander( 'Fitbit Evidence | Production', client.js, client.css );
	}
};
