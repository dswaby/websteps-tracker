define(function (require) {
	var PicturesCollection = require('./collections/PicturesCollection');
  var TrackedRunsCollection = require('./collections/TrackedRunsCollection');
  var LoadingView = require('./../../common/loader/views/LoaderView');
	var MainView = require('./views/MainView');

	return {
		run: function(viewManager) {
      var that = this;
      // display loading view here
      var loader = new LoadingView();
      viewManager.show(loader);
			
      function getRuns() {
        var runCollection = new TrackedRunsCollection();
        var defer = $.Deferred();
          runCollection.fetch({
            success: function(data){
              defer.resolve(data);
            },
            fail: function(error) {
              console.log(error);
            }
          });
        return defer.promise();
      };

      function getPics() {
        var picCollection = new PicturesCollection();
        var defer = $.Deferred();
          picCollection.fetch({
            success: function(data){
              defer.resolve(data);
            },
            fail: function(error) {
              console.log(error);
            }
          });
        return defer.promise();
      };

      function load() {
        var fetchingRuns = getRuns().done(function (runs){
            that.runsCollection = runs;
        });

        var fetchingPics = getPics().done(function (pics){
          that.picturesCollection = pics;
        });
      
        $.when(fetchingRuns, fetchingPics).done(function(){
          var view = new MainView({ collection: trackedRunsCol, model: " bl", runsCollection: that.runsCollection, picsCollection: that.picturesCollection });
          viewManager.show(view);
        });
      };
      load();
		}
	};
});
            // url: "https://spreadsheets.google.com/feeds/list/0AnAVxFHqH0mGdEJmckJEbkVOVkhtQ1djTG9CV0U1Tnc/od6/public/values?alt=json"
