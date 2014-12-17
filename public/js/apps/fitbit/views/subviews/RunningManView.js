define(function (require) {
	var Backbone = require('Backbone');

	var RunningManView = Backbone.View.extend({
		template: require('hbs!./../../templates/RunningManView'),

		render: function () {
			this.$el.html(this.template());
			return this;
		},
    onRender: function() {
      //do something
    }
	});

	return RunningManView;
});