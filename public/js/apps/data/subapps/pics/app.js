define(function (require) {
  var PictureCollection = require('./../../collections/PictureCollection');
  var LoadingView = require('./../../../../common/loader/views/LoaderView');
	var MainView = require('./views/MainView');
  

	return {
		run: function(viewManager) {
      var that = this;
      // display loading view here
      var loader = new LoadingView();
      viewManager.show(loader);
			
      function getPics() {
        var picCollection = new PictureCollection();
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

      // function load() {
        var fetchingRuns = getRuns().done(function (runs){
            that.picsCollection = runs;
        });
      
        $.when(fetchingRuns).done(function(){
          var view = new MainView({ collection: that.picsCollection });
          viewManager.show(view);
        });
		}
	};
});
