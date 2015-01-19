define(function (require) {
	var FitbitStatsCollection = require('./collections/FitbitStatsCollection');
	var MainView = require('./views/MainView');

	return {
		run: function(viewManager) {
			var fitbitStatsCollection = new FitbitStatsCollection();
			fitbitStatsCollection.fetch({
				success: function (fitbitStatsCollection) {
					var view = new MainView({collection: fitbitStatsCollection});
					viewManager.show(view);
				}
			});
		}
	};
});