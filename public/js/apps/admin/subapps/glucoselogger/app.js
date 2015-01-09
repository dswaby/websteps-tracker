define(function(require) {
  var MainView = require('./views/MainView');

  return {
    run: function(viewManager) {
      var mainView = new MainView();
      viewManager.show(mainView);
    }
  };
});