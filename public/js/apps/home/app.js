define(function(require) {
	var MainView = require('./views/MainView');

	return {
		run: function (viewManager) {
      var model = new Backbone.Model({
        title: 'Its like a fitbit in your phone\'s browser', 
        subtitle: 'This is a proof-of-concept pedometer and geo-location app for tracking/real-time communications webapp built using mobile browser technologies'
      });
      var view = new MainView({model: model});
			viewManager.show(view);
		}
	};
});