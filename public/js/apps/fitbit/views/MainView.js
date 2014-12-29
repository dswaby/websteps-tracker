define(function(require) {
  var Backbone = require('Backbone');

  var PicturesView = require('./subviews/PicturesView');
  var RunningManView = require('./subviews/RunningManView');

  var MainView = Backbone.View.extend({
    className: "dannys-unit",
    
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
      var mp3s = ["./../../../mp3/saxguy.mp3", "./../../../mp3/smash_sumthin.mp3", "./../../../mp3/real_bass.mp3"];

      if (!window.audio) {
        window.audio = new Audio();
        window.audio.src = mp3s[ _.random(0, mp3s.length - 1)];
        window.audio.play();
        window.audio.state = "playing";
      }

      $(window).on("click", function(e){
        console.log($(this))
        if (window.audio.state === "playing") {
          window.audio.pause();
          window.audio.state = "paused";
        }
        else if (window.audio.state === "paused") {
          window.audio.play();
          window.audio.state = "playing";
        }
      });
      

      return this;
    }
  });

  return MainView;
});