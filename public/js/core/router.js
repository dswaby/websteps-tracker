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
      'fitbit': 'fitbit',
      'admin': 'admin'
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

    fitbit: function () {
      require('./../apps/fitbit/app').run(viewManager);
    },

    admin: function () {
      require('./../apps/admin/app').run(viewManager);
    }

	});

	return Router;
});