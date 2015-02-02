define(function(require) {
	var Backbone = require('Backbone');

	var TrackedRunsView = require('./subviews/TrackedRunsView');
      console.log(this)

	var MainView = Backbone.View.extend({
		initialize: function () {
			this.subviews = [];
		},

		render: function () {
      console.log(this.model)
			var trackedRunsView = new TrackedRunsView({collection: this.model.get("runs")});
			this.$el.append(trackedRunsView.render().el);
			this.subviews.push(trackedRunsView);

			return this;
		}
	});

	return MainView;
});