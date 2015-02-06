define(function (require) {
  var TrackedRunsCollection = require('./../../collections/TrackedRunsCollection');
  var LoadingView = require('./../../../../common/loader/views/LoaderView');
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

      // function load() {
        var fetchingRuns = getRuns().done(function (runs){
            that.runsCollection = runs;
        });
      
        $.when(fetchingRuns).done(function(){
          var view = new MainView({ collection: that.runsCollection });
          viewManager.show(view);
        });
		}
	};
});
