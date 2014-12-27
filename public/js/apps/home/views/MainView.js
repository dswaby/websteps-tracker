define(function (require) {
	var Backbone = require('Backbone');

	var HeaderView = require('./HeaderView');
	var FooterView = require('./FooterView');
  require("velocity");
	var MainView = Backbone.View.extend({
		initialize: function () {
			this.subviews = [];
		},

		render: function () {
			var headerView = new HeaderView();
			this.subviews.push(headerView);
			this.$el.append(headerView.render().el);

			var footerView = new FooterView();
			this.subviews.push(footerView);
			this.$el.append(footerView.render().el);

      var condescendingStatements = ["There are two reasons why you would land on this page", "Either you have accused me of cheating on fitbit", "or you are trying every subdomain of http://swa.by to see if there is a page there", "lets be realistic...."];
			return this;
		}
	});

	return MainView;
});