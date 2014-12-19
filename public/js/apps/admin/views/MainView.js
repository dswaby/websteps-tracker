define(function(require) {
  var Backbone = require('Backbone');

  var imageUploaderView = require('./subviews/ImageUploaderView');

  var MainView = Backbone.View.extend({

    render: function () {
      var imageUploaderView = new ImageUploaderView();
    

      return this;
    }
  });

  return MainView;
});