define(function(require) {
  var DemoView = require('./views/DemoView');

  return {
    run: function (viewManager) {
      var view = new DemoView();
      viewManager.show(view);
    }
  };
});