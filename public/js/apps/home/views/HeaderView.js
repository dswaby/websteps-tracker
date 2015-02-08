define(function (require) {
	var Backbone = require('Backbone');

	var HeaderView = Backbone.View.extend({
		template: require('hbs!./../templates/HeaderView'),
    tagName: 'header',
		render: function () {
			this.$el.html(this.template({subtitle: 'Welcome to fitb.swa.by, a proof of concept fitness tracking and logging webapp'}));
			return this;
		}
	});

	return HeaderView;
});