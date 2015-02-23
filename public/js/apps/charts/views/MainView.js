define(function(require) {
	var Backbone = require('Backbone');

  var GlucoseChartView = require('./subviews/GlucoseChartView');

	var MainView = Backbone.View.extend({
    className: 'charts-view',
		initialize: function () {
			this.subviews = [];
		},

		render: function () {
      var glucoseChartView = new GlucoseChartView();
      this.$el.append(glucoseChartView.render().el);

			return this;
		}
	});

	return MainView;
});