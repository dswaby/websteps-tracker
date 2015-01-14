define(function (require) {
  var Backbone = require('Backbone');
  var io = require('socketio');
  var StatusView = Backbone.View.extend({
    template: require('hbs!./../../templates/StatusView'),
    className: 'location-wrapper',
    events: {
      'click #silent-audio': 'playAudio',
      'click #pedometer': 'startCounting'
    },
    render: function () {
      this.$el.html(this.template());
      this.connectSocket();
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
    connectSocket: function(){
      var that = this;
      that.socket = io.connect('http://fitb.apps.swa.by:3634');      
      that.socket.on('news', function (data) {
        that.socket.emit('my other event', { my: 'data' });
      });
    },
    startCounting: function() {
      var that = this;
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
      var steps = 0;
      var halfStep = 0;
      var state = "low";
      var c3rendered = false;
      var activityLevel = null;
      if (!window.ondevicemotion){
        window.ondevicemotion = function(event) {
           interval = event.interval;
           accelerationX = event.accelerationIncludingGravity.x;  
           accelerationY = event.accelerationIncludingGravity.y;  
           accelerationZ = event.accelerationIncludingGravity.z;  
        };
      }

      
     
      var intervalId = setInterval(function() {
          var plotPoint = (accelerationX * accelerationX) + (accelerationY * accelerationY) + (accelerationZ * accelerationZ);
          if (state === "low" ) {
            if (plotPoint >= config.high) {
              halfStep++;
              state = "high";
            }
          }
          else if (state === "high") {
            if (plotPoint <= config.low) {
                halfStep++;
                state = "low";
            }
          }
          if (halfStep === 2) {
            steps++;
            that.socket.emit('steps updated', { stepCount: steps });
            document.getElementById("steps").innerHTML = parseInt(steps);
          }
      }, delay);
    }
  });

  return StatusView;
});