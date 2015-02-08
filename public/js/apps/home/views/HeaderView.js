define(function (require) {
	var Backbone = require('Backbone');

	var HeaderView = Backbone.View.extend({
		template: require('hbs!./../templates/HeaderView'),
    tagName: 'header',
		render: function () {
			this.$el.html(this.template({title: 'Welcome', subtitle: 'This is a proof of concept pedometer and fitness tracking/real-time communications app built using web technologies'}));
			return this;
		}
	});

	return HeaderView;
});