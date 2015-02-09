define(function (require) {
	var Backbone = require('Backbone');

	var HeaderView = require('./HeaderView');
	var MainView = Backbone.View.extend({
    className: "home-main-view",
		initialize: function () {
			this.subviews = [];
		},

		render: function () {
      model = this.model

      if (!model) {
        model = new Backbone.Model({title: '', subtitle: ''});
      };
			var headerView = new HeaderView({model: model});
			this.subviews.push(headerView);
			this.$el.append(headerView.render().el);

			return this;
		}
	});
	return MainView;
});