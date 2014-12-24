define(function(require) {
  var Backbone = require('Backbone');

  var PicturesView = require('./subviews/PicturesView');
  var RunningManView = require('./subviews/RunningManView');

  var MainView = Backbone.View.extend({
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

      //Audio 
      if (!window.audio) {
        window.audio = new Audio();
        window.audio.src = "./../../../mp3/saxguy.mp3";
        window.audio.play();
      }

      window.on("click", function(e){
        window.audio.pause();
        
      })
      

      return this;
    }
  });

  return MainView;
});