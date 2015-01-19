define(function(require) {
	var Backbone = require('Backbone');

	var TrackedRunView = Backbone.View.extend({
		template: require('hbs!./../../templates/TrackedRunView'),

		render: function () {
			this.$el.html(this.template());
			return this;
		}
	});

	return TrackedRunView;
});