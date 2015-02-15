define(function (require) {
  var PicturesCollection = require('./../../collections/PicturesCollection');
  var LoadingView = require('./../../../../common/loader/views/LoaderView');
	var MainView = require('./views/MainView');
  

	return {
		run: function(viewManager) {
      var that = this;
      // display loading view here
      var loader = new LoadingView();
      viewManager.show(loader);
			
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

      var fetchingPics = getPics().done(function (pics){
        that.picturesCollection = pics;
      });

      $.when(fetchingPics).done(function(){
        var model = new Backbone.Model({
            runs: that.runsCollection, pics: that.picturesCollection
        });
        var view = new MainView({ model: model });
        viewManager.show(view);
      });
		}
	};
});
