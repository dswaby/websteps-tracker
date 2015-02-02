define(function (require) {
  var Backbone = require('Backbone');

  var ImageUploaderView = require('./subviews/ImageUploaderView');
  var PhotoLogModel = require('./../models/PhotoLog');
  var MainView = Backbone.View.extend({
    className: "admin-main-view",
    
    initialize: function () {
      this.subviews = [];
    },

    render: function () {
      var emptyModel = new PhotoLogModel();
      var imageUploaderView = new ImageUploaderView({model: emptyModel});
      this.subviews.push(imageUploaderView);
      this.$el.append(imageUploaderView.render().el);
      return this;
    }
  });

  return MainView;
});