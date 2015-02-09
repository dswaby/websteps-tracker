define(function(require) {
  var MainView = require('./views/MainView');

  return {
    run: function (viewManager) {
      var model = new Backbone.Model({
        title: 'Step/Geo-location tracking for mobile web browsers', 
        subtitle: 'This is a proof-of-concept pedometer and fitness tracking/real-time communications webapp built using mobile browser technologies'
      });
      var view = new MainView({model: model});
      viewManager.show(view);
    }
  };
});