define(function (require) {
	var Backbone = require('Backbone');

	var HeaderView = require('./HeaderView');
  require("velocity");
	var MainView = Backbone.View.extend({
    className: "home-main-view",
		initialize: function () {
			this.subviews = [];
		},

		render: function () {
			var headerView = new HeaderView();
			this.subviews.push(headerView);
			this.$el.append(headerView.render().el);

			return this;
		}
	});
	return MainView;
});