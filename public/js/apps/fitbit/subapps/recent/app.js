define(function(require) {
  var MainView = require('./views/MainView');
  var Recent = require('./../../models/Recent');

  return {
    run: function(viewManager) {
      var email = new Recent();
      var mainView = new MainView({model: email});
      viewManager.show(mainView);
    }
  };
});