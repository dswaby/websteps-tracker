define(function(require) {
  var AboutView = require('./views/AboutView');

  return {
    run: function (viewManager) {
      var view = new AboutView();
      viewManager.show(view);
    }
  };
});