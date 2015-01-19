define(function(require) {
	var Backbone = require('Backbone');
	var FitbitStatView = require('./FitbitStatView');

	var FitbitStatsView = Backbone.View.extend({
		template: require('hbs!./../../templates/FitbitStatsView'),

		initialize: function () {
			this.subviews = [];
		},

		render: function () {
			this.$el.html(this.template());

			var stats = this.$('.stats');
			this.collection.forEach(function (stat) {
				var view = new FitbitStatView({model: stat});
				stats.append(view.render().el);
				this.subviews.push(view);
			}, this);

			return this;
		}
	});

	return FitbitStatsView;
});