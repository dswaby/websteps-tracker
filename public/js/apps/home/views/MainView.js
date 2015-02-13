define(function (require) {
	var Backbone = require('Backbone');

	var HomeView = require('./HomeView');
	var MainView = Backbone.View.extend({
    className: "home-main-view",

		initialize: function () {
			this.subviews = [];
      this.transition = {
        in : "bounceInRight",
        out: "fadeOutLeftBig",
        delay: 600
      };
		},

		render: function () {
      model = this.model

      if (!model) {
        model = new Backbone.Model({title: '', subtitle: ''});
      };
			var homeView = new HomeView({model: model});
			this.subviews.push(homeView);
			this.$el.append(homeView.render().el);

			return this;
		}
	});
	return MainView;
});