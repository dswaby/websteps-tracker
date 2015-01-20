define(function(require) {
	var Backbone = require('Backbone');

	var TrackedRunsView = require('./subviews/TrackedRunsView');
	var FitbitStatsView = require('./subviews/FitbitStatsView');

	var MainView = Backbone.View.extend({
		initialize: function () {
			this.subviews = [];
		},

		render: function () {
			var trackedRunsView = new TrackedRunsView();
			this.$el.append(trackedRunsView.render().el);
			this.subviews.push(trackedRunsView);

			var fbStatView = new FitbitStatsView({collection: this.collection});
			this.$el.append(fbStatView.render().el);
			this.subviews.push(fbStatsView);

			return this;
		}
	});

	return MainView;
});