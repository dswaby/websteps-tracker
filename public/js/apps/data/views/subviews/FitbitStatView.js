define(function (require) {
	var Backbone = require('Backbone');

	var FitbitStatView = Backbone.View.extend({
		tagName: 'tr',

		template: require('hbs!./../../templates/FitbitStatView'),

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	return FitbitStatView;
});