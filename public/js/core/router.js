define(function(require) {
	var Backbone = require('Backbone');
	var viewManager = require('./viewManager');

	var Router = Backbone.Router.extend({
		routes: {
			'': 'home',
			'inbox': 'inbox',
			'inbox/compose': 'inboxCompose',
			'charts': 'charts',
			'tasks': 'tasks',
      'pics': 'pics',
      'admin': 'admin',
      'admin/upload': 'adminUpload',
      'admin/glucoselog': 'adminGlucoseLog'
		},

		home: function () {
			require('./../apps/home/app').run(viewManager);
		},

		inbox: function () {
			require('./../apps/inbox/app').run(viewManager);
		},

		inboxCompose: function () {
			require('./../apps/inbox/subapps/compose/app').run(viewManager);
		},

		charts: function () {
			require('./../apps/charts/app').run(viewManager);
		},

		tasks: function () {
			require('./../apps/tasks/app').run(viewManager);
		},

    pics: function () {
      require('./../apps/pics/app').run(viewManager);
    },

    admin: function () {
      require('./../apps/admin/app').run(viewManager);
    },

    adminUpload: function () {
      require('./../apps/admin/subapps/imageuploader/app').run(viewManager);
    },

    adminGlucoseLog: function () {
      require('./../apps/admin/subapps/glucoselogger/app').run(viewManager);
    }

	});

	return Router;
});