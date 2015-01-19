define(function (require) {
	var Backbone = require('Backbone');
	var FitbitStat = require('./../models/FitbitStat');

	var FitbitStatsCollection = Backbone.Collection.extend({
		model: FitbitStat,

		url: '/api/emails'
	});

	return FitbitStatsCollection;
});