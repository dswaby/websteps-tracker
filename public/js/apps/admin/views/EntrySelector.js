define(function(require) {
  var Backbone = require('Backbone');

  var ImageUploaderView = require('./subviews/ImageUploaderView');

  var MainView = Backbone.View.extend({
    className: "main-view",

    initialize: function () {
      this.subviews = [];
    },
    render: function () {
      var entrySelectorView = new ImageUploaderView();
      this.subviews.push(imageUploaderView);
      this.$el.append(imageUploaderView.render().el);

      return this;
    }
  });

  return MainView;
});