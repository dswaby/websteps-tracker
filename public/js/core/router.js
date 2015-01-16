define(function(require) {
	var Backbone = require('Backbone');
	var viewManager = require('./viewManager');

	var Router = Backbone.Router.extend({
		routes: {
			'': 'home',
			'inbox': 'inbox',
			'inbox/compose': 'inboxCompose',
      'recent': 'recent',
      'recent/': 'recent',

			'charts': 'charts',
      'charts/': 'charts',

			'status': 'status',
      'status/': 'status',

      'admin': 'admin',
      'admin/': 'admin',
      'admin/upload': 'adminUpload',
      'admin/upload/': 'adminUpload',

      'admin/glucoselog': 'adminGlucoseLog',
      'admin/glucoselog/': 'adminGlucoseLog',

      'admin/status': 'statusUpdater',
      'admin/status/': 'statusUpdater'

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

		status: function () {
			require('./../apps/status/app').run(viewManager);
		},

    recent: function () {
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
    },

    statusUpdater: function () {
      require('./../apps/admin/subapps/status/app').run(viewManager);
    },

	});

	return Router;
});