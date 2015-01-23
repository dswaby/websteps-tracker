define(function (require) {
	var FitbitStatsCollection = require('./collections/FitbitStatsCollection');
  var TrackedRunsCollection = require('./collections/TrackedRunsCollection');
	var MainView = require('./views/MainView');

	return {
		run: function(viewManager) {
      // display loading view here
      // var view = new LoadingView();
      // viewManager.show(view);
			var trackedRunsCollection = new TrackedRunsCollection();
			trackedRunsCollection.fetch({
				success: function (trackedRunsCol) {
          $.ajax({
            type: "GET",
            url: "https://spreadsheets.google.com/feeds/list/0AnAVxFHqH0mGdEJmckJEbkVOVkhtQ1djTG9CV0U1Tnc/od6/public/values?alt=json"
          })
          .done(function (fbData) {
            var fbStatsCollection = new FitbitStatsCollection(fbData.feed.entry);
            var view = new MainView({ 
              trackedRuns: trackedRunsCol,
              statsCollection: fbStatsCollection
            });
            viewManager.show(view);
          })
          .fail(function (error) {
            console.log("error, returned error:", error);
            viewManager.show(view);
          });
				}
			});
		}
	};
});