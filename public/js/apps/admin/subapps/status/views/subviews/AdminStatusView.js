define(function (require) {
  var Backbone = require('Backbone');
  var io = require('socketio');
  var intervalId;
  var watchid;
  var AdminStatusView = Backbone.View.extend({
    mobile:false,
    steps: 0,
    state: {},
    template: require('hbs!./../../templates/AdminStatusView'),
    className: 'location-wrapper',
    events: {
      'click #silent-audio': 'playAudio',
      'click #pedometer': 'togglePedometer',
      'click input#treadmill-toggle': 'toggleTreadMill',
      'click input#location-toggle':'toggleLocation'
    },
    render: function () {
      this.$el.html(this.template());
      this.connectSocket();
      this.checkMobile();
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
      // if (that.state.treadmillOn) {
      //   that.$el.find("#treadmill").addClass("toggle-on");
      //   that.state.treadmillOn = false;
      // }
      // else {
      //   that.$el.find("#treadmill").html("toggle-off");
      //   that.state.treadmillOn = true;
      //   that.socket.emit('on treadmill');
      // }
    },
    checkMobile: function() {
      var that = this;
      if( navigator.userAgent.match(/Android/i)
       || navigator.userAgent.match(/webOS/i)
       || navigator.userAgent.match(/iPhone/i)
       || navigator.userAgent.match(/iPad/i)
       || navigator.userAgent.match(/iPod/i)
       || navigator.userAgent.match(/BlackBerry/i)
       ){
        that.mobile = true;
      }
      else {
        console.log("browser not supported");
      }
    },
    updateLocation: function() {
      var that = this;
      var geoOptions = {
        'enableHighAccuracy':true,
        'timeout':10000,
        'maximumAge':20000
      };

      function gotPosition(pos) {
        that.socket.emit('location', { latitude: pos.coords.latitude, longitude:  pos.coords.longitude});
      }
      function errorGettingPosition(error) {
        that.socket.emit('location error', {error: error}); 
      }
      navigator.geolocation.getCurrentPosition(gotPosition, errorGettingPosition, geoOptions);
    },
    toggleLocation: function (event) {
      var that = this;
      if (that.state.locationOn) {
        that.state.locationOn = false;
      }
      else if (that.mobile) {
        that.state.locationOn = true;
        that.updateLocation();
      }
    },
    togglePedometer: function() {
      var that = this;
        if (that.state.pedometerOn) {
          clearInterval(intervalId);
          that.$el.find("#pedometer").html("start pedometer");
          that.state.pedometerOn = false;
        }
        else if (that.mobile === true) {
          that.startPedometer();
          that.$el.find("#pedometer").html("pause pedometer");
          that.state.pedometerOn = true;
        }
        else {
          that.$el.find("#pedometer").html("API unsupported");
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
        low: 50,
        falseStepPassLimit: 50,
        delay: 50,
        locationUpdatePasses: 80
      };
      var runnningPeak = 700;
      var falseStepTracker = 0;
      var halfStep = 0;
      var stepState = "low";

      that.socket.emit('steps updated', { stepCount: that.steps });

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
          
          if (stepState === "low" ) {
            if (plotPoint >= config.high) {
              if (falseStepTracker < config.falseStepPassLimit) {
                that.steps++;
                stepState = "high";
                that.socket.emit('steps updated', { stepCount: that.steps });
                document.getElementById("steps").innerHTML = that.steps;
                falseStepTracker = 0;
              }
              else {
                falseStepTracker = 0;
              }
            }
            else {
              falseStepTracker++;
            }
          }
          else if (stepState === "high") {
            if (plotPoint <= config.low) {
              if (falseStepTracker < config.falseStepPassLimit) {
                that.steps++;
                stepState = "low";
                that.socket.emit('steps updated', { stepCount: that.steps });
                document.getElementById("steps").innerHTML = that.steps;
                falseStepTracker = 0;
              } else {
                falseStepTracker = 0;
              }
            }
            else {
              falseStepTracker++;
            }
          }
          //send latitude and longitude
          if (that.state.locationOn && locationIntervalPasses === config.locationUpdatePasses) {
            that.updateLocation();
            locationIntervalPasses = 0;
          } 
          else {
            locationIntervalPasses++;
          }
        }, config.delay)
    }
  });

  return AdminStatusView;
});