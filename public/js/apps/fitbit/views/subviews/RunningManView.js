define(function (require) {
	var Backbone = require('Backbone');
  var audio = undefined;
	var RunningManView = Backbone.View.extend({
		template: require('hbs!./../../templates/RunningManView'),
    

		render: function () {
			this.$el.html(this.template());
       
			return this;
		},
    events: {
      "click div#audio-toggle": "toggleAudio"
    },
    toggleAudio: function(e) {
      //Audio 
      var mp3s = ["./../../../mp3/saxguy.mp3", "./../../../mp3/smash_sumthin.mp3", "./../../../mp3/real_bass.mp3"];
      if (!audio) {
        audio = new Audio();
        audio.src = mp3s[ _.random(0, mp3s.length - 1)];
        audio.play();
        audio.state = "playing";
        $("#audio-toggle").html("Toggle off Audio");
      }
      else if (audio.state === "playing") {
        audio.pause();
        audio.state = "paused";
        $("#audio-toggle").html("Toggle on Audio");
      }
      else if (audio.state === "paused") {
        audio.play();
        audio.state = "playing";
        $("#audio-toggle").html("Toggle off Audio");
      }
    }
    
	});

	return RunningManView;
});