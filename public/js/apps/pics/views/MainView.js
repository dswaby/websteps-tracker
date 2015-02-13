define(function(require) {
  var Backbone = require('Backbone');

  var PicturesView = require('./subviews/PicturesView');
  var RunningManView = require('./subviews/RunningManView');

  var MainView = Backbone.View.extend({
    className: "pics-main-view",
    transition: {
      in : "bounceInUp",
      out: "bounceOutDown",
      delay: 900
    },

    initialize: function () {
      this.subviews = [];
    },


    render: function () {
      var runningManView = new RunningManView();
      this.$el.append(runningManView.render().el);
      this.subviews.push(runningManView);

      var picturesView = new PicturesView({collection: this.collection});
      this.$el.append(picturesView.render().el);
      this.subviews.push(picturesView);

      return this;
    }
  });

  return MainView;
});