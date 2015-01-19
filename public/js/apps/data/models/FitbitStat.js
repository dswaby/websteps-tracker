define(function(require) {
	var Backbone = require('Backbone');

	var FitbitStat = Backbone.Model.extend({
		urlRoot: '/api/emails'
	});

	return FitbitStat;
});