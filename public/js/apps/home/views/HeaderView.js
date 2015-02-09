define(function (require) {
	var Backbone = require('Backbone');

	var HeaderView = Backbone.View.extend({
		template: require('hbs!./../templates/HeaderView'),
    tagName: 'header',
		render: function () {
			this.$el.html(this.template({title: 'Step/Geo-location tracking for mobile web browsers', subtitle: 'This is a proof-of-concept pedometer and fitness tracking/real-time communications webapp built using mobile browser technologies'}));
			return this;
		}
	});

	return HeaderView;
});