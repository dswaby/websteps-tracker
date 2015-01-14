require.config({
	hbs: {
		templateExtension: 'html',
		disableI18n: true,
    helpers: true
	},

	shim: {
		'jQuery': {
			exports: '$'
		},

		'Underscore': {
			exports: '_'
		},

		'Backbone': {
			deps: ['Underscore', 'jQuery'],
			exports: 'Backbone'
		},

		'Handlebars': {
			deps: ['handlebars'],
			exports: 'Handlebars'
		},

		'ApplicationRouter': {
			deps: ['jQuery', 'Underscore', 'Backbone']
		},

    'jQueryForm': {
      deps: ['jQuery']
    }
	},

	paths: {
		jQuery: './../components/jquery/jquery',
		Underscore: './../components/underscore/underscore',
		underscore: './../components/require-handlebars-plugin/hbs/underscore',
		Backbone: './../components/backbone/backbone',
		handlebars: './../components/require-handlebars-plugin/Handlebars',
		hbs: './../components/require-handlebars-plugin/hbs',
		i18nprecompile : './../components/require-handlebars-plugin/hbs/i18nprecompile',
		json2 : './../components/require-handlebars-plugin/hbs/json2',
    jQueryForm: './../components/jquery-form/jquery.form',
    velocity: './../components/velocity/velocity',
    moment: './../components/moment/moment',
    c3: './../components/c3/c3',
    d3: './../components/d3/d3', 
    socketio: 'http://localhost:8000/socket.io/socket.io'
	}
});

require(['core/router', 'core/client', 'Backbone'], function (Router, client, Backbone) {
	var app = {
		root: '/'
	};

	window.Router = new Router();
	client.setup(window, app);

	Backbone.history.start({ pushState: true });
});