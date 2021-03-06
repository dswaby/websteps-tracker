require.config( {
	hbs: {
		templateExtension: 'html',
		disableI18n: true,
		helpers: true,
		helperPathCallback: // Callback to determine the path to look for helpers
			function( name ) { // ('/templates/helpers/'+name by default)
			return 'template/helpers/' + name;
		},
	},

	shim: {
		'jQuery': {
			exports: '$'
		},

		'Underscore': {
			exports: '_'
		},

		'Backbone': {
			deps: [ 'Underscore', 'jQuery' ],
			exports: 'Backbone'
		},
		'Handlebars': {
			deps: [ 'handlebars' ],
			exports: 'Handlebars'
		},

		'ApplicationRouter': {
			deps: [ 'jQuery', 'Underscore', 'Backbone' ]
		},

		'jQueryForm': {
			deps: [ 'jQuery' ]
		}
	},

	paths: {
		jQuery: './../components/jquery/dist/jquery',
		Underscore: './../components/underscore/underscore',
		underscore: './../components/require-handlebars-plugin/hbs/underscore',
		Backbone: './../components/backbone/backbone',
		handlebars: './../components/require-handlebars-plugin/Handlebars',
		hbs: './../components/require-handlebars-plugin/hbs',
		i18nprecompile: './../components/require-handlebars-plugin/hbs/i18nprecompile',
		json2: './../components/require-handlebars-plugin/hbs/json2',
		jQueryForm: './../components/jquery-form/jquery.form',
		velocity: './../components/velocity/velocity',
		moment: './../components/moment/moment',
		c3: './../components/c3/c3',
		d3: './../components/d3/d3',
		async: './../components/requirejs-plugins/src/async',
		backboneFileUpload: './../components/backbone-mobile-file-upload',
		backboneModal: './../js/common/backbone.modal',
		socketio: 'http://websteps.apps.swa.by:3634/socket.io/socket.io'
			// socketio: 'http://localhost:8000/socket.io/socket.io'
	}
} );

require( [ 'core/router', 'core/client', 'Backbone' ], function( Router, client, Backbone ) {
	var app = {
		root: '/'
	};

	Backbone.Extensions = {};
	Backbone.Entities = {};

	window.Router = new Router();
	client.setup( window, app );

	Backbone.history.start( { pushState: true } );
} );
