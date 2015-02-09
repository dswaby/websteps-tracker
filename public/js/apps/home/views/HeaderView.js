define(function (require) {
	var Backbone = require('Backbone');

	var HeaderView = Backbone.View.extend({
		template: require('hbs!./../templates/HeaderView'),
    tagName: 'header',
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	return HeaderView;
});