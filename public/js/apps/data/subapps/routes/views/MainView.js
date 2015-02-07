define(function(require) {
	var Backbone = require('Backbone');

	var TrackedRunsView = require('./subviews/TrackedRunsView');

	var MainView = Backbone.View.extend({
    className: 'main-data-view',
		initialize: function () {
			this.subviews = [];
		},

		render: function () {
			var trackedRunsView = new TrackedRunsView({collection: this.collection});
			this.$el.append(trackedRunsView.render().el);
			this.subviews.push(trackedRunsView);
		}
	});

	return MainView;
});