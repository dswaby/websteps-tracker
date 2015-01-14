define(function (require) {
  var Backbone = require('Backbone');

  var StatusView = Backbone.View.extend({
    template: require('hbs!./../../templates/StatusView'),
    className: 'location-wrapper',
    events: {
      'click #silent-audio': 'playAudio',
      'click #pedometer': 'startCounting'
    },
    render: function () {
      this.$el.html(this.template());

      //start polling
      //update views
      return this;
    },
    playAudio: function(){
      var audio = new Audio();
      $(this.$el).append(audio);
      audio.src = "./../../../../../../mp3/5min.mp3";
      audio.play();
    },
    startCounting: function() {
        var interval = 0;
        var delay = 100;
        // var timeline = ["x"];
        // var plot = ["points"];
        var accelerationX = 0;  
        var accelerationY = 0;  
        var accelerationZ = 0;  
        var config = {
          high: 220,
          low: 70
        };
        var runnningPeak = 700;
        var peaks = 0;
        var state = "low";
        var c3rendered = false;
        var activityLevel = null;

      window.ondevicemotion = function(event) {
         interval = event.interval;
         accelerationX = event.accelerationIncludingGravity.x;  
         accelerationY = event.accelerationIncludingGravity.y;  
         accelerationZ = event.accelerationIncludingGravity.z;  
      };
     
      var intervalId = setInterval(function() {
        // if (plot.length < 1000) {
          var plotPoint = (accelerationX * accelerationX) + (accelerationY * accelerationY) + (accelerationZ * accelerationZ);
          plot.push(plotPoint);
          if (state === "low" ) {
            if (plotPoint >= config.high) {
              peaks++;
              state = "high";
            }
          }
          else if (state === "high") {
            if (plotPoint <= config.low) {
                peaks++;
                state = "low";
            }
          }
          document.getElementById("steps").innerHTML = parseInt(peaks/2);
        // }
        // else if (!c3rendered) {
        //   clearInterval(intervalId);
          
        //   var chart = c3.generate({
        //     bindto: "#interval",
        //     data: {
        //       columns: [
        //           plot
        //       ]
        //     }
        //   });
        //   c3rendered = true;
        // }
      }, delay);
    }
  });

  return StatusView;
});