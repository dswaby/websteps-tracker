define(function (require) {
	var Backbone = require('Backbone');

	var HeaderView = Backbone.View.extend({
		template: require('hbs!./../templates/HeaderView'),

		render: function () {
			this.$el.html(this.template({title: 'Picture logs of fitness activity', subtitle: '... since a wearing a device that tracks each of your steps isn\'t always enough'}));
			return this;
		}
	});

	return HeaderView;
});