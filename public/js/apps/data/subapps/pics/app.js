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
        this.collection = pics;
      });

      $.when(fetchingPics).done(function(){
        var view = new MainView({ collection: this.collection });
        viewManager.show(view);
      });
		}
	};
});
