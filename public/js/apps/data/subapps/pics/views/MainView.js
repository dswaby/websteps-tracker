define(function(require) {
	var Backbone = require('Backbone');

	var PicturesView = require('./subviews/PicturesView');

	var MainView = Backbone.View.extend({
    className: 'main-data-view',
		initialize: function () {
			this.subviews = [];
      
		},
    transition: {
      in : "bounceInRight",
      out: "bounceOutLeft",
      delay: 450
    },

		render: function () {
			var picturesView = new PicturesView({collection: this.collection});
			this.$el.append(picturesView.render().el);
			this.subviews.push(picturesView);
		}
	});

	return MainView;
});