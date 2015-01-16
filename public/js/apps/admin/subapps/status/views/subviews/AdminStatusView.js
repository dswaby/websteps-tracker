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
    mobile:false,
    steps: 0,
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
        that.$el.find("#treadmill").addClass("toggle-on");
        that.state.treadmillOn = false;
      }
      else {
        that.$el.find("#treadmill").html("toggle-off");
        that.state.treadmillOn = true;
        that.socket.emit('on treadmill');
      }
    },
    checkMobile: function() {
      if( navigator.userAgent.match(/Android/i)
       || navigator.userAgent.match(/webOS/i)
       || navigator.userAgent.match(/iPhone/i)
       || navigator.userAgent.match(/iPad/i)
       || navigator.userAgent.match(/iPod/i)
       || navigator.userAgent.match(/BlackBerry/i)
       ){
        that.mobile = true;
      }
    },
    trackLocation: function() {
      if (that.mobile) {
        var watchid = navigator.geolocation.watchPosition(gotPosition, errorGettingPosition, {'enableHighAccuracy':true,'timeout':10000,'maximumAge':20000});
      }
      function gotPosition(pos) {
        
      }
    },
    toggleLocation: function(){
      var that = this;
      if (that.state.locationOn) {
        that.$el.find("#location").addClass("toggle-off");
        that.state.locationOn = false;
      }
      else {
        that.$el.find("#location").html("toggle-on");
        that.checkMobile();
        that.trackLocation();
        that.state.treadmillOn = true;
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
        that.startPedometer();
        that.$el.find("#pedometer").html("pause pedometer");
        that.state.pedometerOn = true;
      }
    },
    startPedometer: function() {
      var that = this;
      var interval = 0;
      var locationIntervalPasses = 0;
      var accelerationX = 0;  
      var accelerationY = 0;  
      var accelerationZ = 0;  
      var config = {
        high: 275,
        low: 0
      };
      var runnningPeak = 700;
      // var falseStepCount = 0;
      // var halfStep = 0;
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
        if (that.state.locationOn) {
          if (locationIntervalPasses === 20) {
            // send coordinates here
            that.socket.emit("location updated");
            locationIntervalPasses = 0;
          }
          else {
            locationIntervalPasses++;
          }
        }
        if (state === "low" ) {
          if (plotPoint >= config.high) {
            that.steps++;
            state = "high";
            // falseStepCount = 0;
          }
        }
        else if (state === "high") {
          if (plotPoint <= config.low) {
              that.steps++;
              state = "low";
              // falseStepCount = 0;
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
          that.socket.emit('steps updated', { stepCount: that.steps });
          document.getElementById("steps").innerHTML = that.steps;
          // halfStep = 0;
        // }
      }, that.delay);
    }
  });

  return StatusView;
});