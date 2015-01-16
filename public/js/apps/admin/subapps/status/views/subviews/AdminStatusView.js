define(function (require) {
  var Backbone = require('Backbone');
  var io = require('socketio');
  var intervalId;
  var wnt = {};
    wnt.mobile = false;
    wnt.ie = false;
    wnt.steps = localStorage.steps;
  var StatusView = Backbone.View.extend({
    delay: 10,
    state: {},
    // falseStepLimit: 25,
    template: require('hbs!./../../templates/AdminStatusView'),
    className: 'location-wrapper',
    events: {
      'click #silent-audio': 'playAudio',
      'click #pedometer': 'togglePedometer',
      'click #treadmill-toggle': 'toggleTreadMill',
      'click #geo-location-toggle':'toggleLocation'
    },
    render: function () {
      this.$el.html(this.template());
      this.connectSocket();
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
      that.socket = io.connect('/admin');
      // that.socket = io.connect('http://localhost/admin');      

      that.socket.on('news', function (data) {
        that.socket.emit('danny connected');
      });
      that.socket.on('location', function (data) {
        that.socket.emit('my other event', { my: 'data' });
      });
      that.socket.on('is danny connected', function(){
        console.log('is danny connected heard!');
        that.socket.emit('danny is connected');
      });
    },
    toggleTreadMill: function(){
      var that = this;
      if (that.state.treadmillOn) {
        that.$el.find("#treadmillToggle").addClass("toggle-on");
        that.state.treadmillOn = false;
      }
      else {
        that.$el.find("#pedometer").html("toggle-off");
        that.state.treadmillOn = true;
        that.socket.emit('on treadmill');
      }
    },
    togglePedometer: function() {
      var that = this;
      if (that.state.pedometerOn) {
        clearInterval(intervalId);
        that.$el.find("#pedometer").html("start pedometer");
        that.state.pedometerOn = false;
      }
      else {
        that.startCounting();
        that.$el.find("#pedometer").html("pause pedometer");
        that.state.pedometerOn = true;
      }
    },
    startCounting: function() {
      var that = this;
      var interval = 0;
      var accelerationX = 0;  
      var accelerationY = 0;  
      var accelerationZ = 0;  
      var config = {
        high: 220,
        low: 70
      };
      var runnningPeak = 700;
      var falseStepCount = 0;
      var steps = 0;
      var halfStep = 0;
      var state = "low";

      that.socket.emit('steps updated', { stepCount: steps });

      if (window.DeviceMotionEvent==undefined) {
      } else {

        window.ondevicemotion = function(event) {
           interval = event.interval;
           accelerationX = event.accelerationIncludingGravity.x;  
           accelerationY = event.accelerationIncludingGravity.y;  
           accelerationZ = event.accelerationIncludingGravity.z;  
        };
      } 

      intervalId = setInterval(function() {
        var plotPoint = (accelerationX * accelerationX) + (accelerationY * accelerationY) + (accelerationZ * accelerationZ);
        if (state === "low" ) {
          if (plotPoint >= config.high) {
            steps++;
            state = "high";
            // falseStepCount = 0;
          }
        }
        else if (state === "high") {
          if (plotPoint <= config.low) {
              steps++;
              state = "low";
              falseStepCount = 0;
          }
          // else {
          //   falseStepCount++;
          // }
        }

        // if (falseStepCount === that.falseStepLimit) {
        //   halfStep = 0;
        //   falseStepCount= 0;
        // }

        // if (halfStep === 2) {
          // steps++;
          that.socket.emit('steps updated', { stepCount: steps });
          document.getElementById("steps").innerHTML = steps;
          // halfStep = 0;
        // }
      }, that.delay);
    }
  });

  return StatusView;
});