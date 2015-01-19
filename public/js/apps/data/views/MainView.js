define(function(require) {
	var Backbone = require('Backbone');

	var ButtonsView = require('./subviews/ButtonsView');
	var FitbitStatsView = require('./subviews/FitbitStatsView');

	var MainView = Backbone.View.extend({
		initialize: function () {
			this.subviews = [];
		},

		render: function () {
			var buttonsView = new ButtonsView();
			this.$el.append(buttonsView.render().el);
			this.subviews.push(buttonsView);

			var fbStatView = new FitbitStatsView({collection: this.collection});
			this.$el.append(fbStatView.render().el);
			this.subviews.push(fbStatsView);

			return this;
		}
	});

	return MainView;
});