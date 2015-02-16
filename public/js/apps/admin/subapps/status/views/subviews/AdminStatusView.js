define(function (require) {
  var Backbone = require('Backbone');
  
  var intervalId;
  var watchid;
  var AdminStatusView = Backbone.View.extend({
    mobile:false,
    locationId: '',
    steps: 0,
    state: {},
    treadmill: false,
    firstPassLoc: true,
    template: require('hbs!./../../templates/AdminStatusView'),
    className: 'admin-status-updater-view',
    events: {
      'click #pedometer': 'togglePedometer',
      'click input#treadmill-toggle': 'toggleTreadMill',
      'click input#location-toggle':'toggleLocation'
    },
    render: function () {
      this.$el.html(this.template());
      this._socketEvents();
      this._checkMobile();
      return this;
    },
    _socketEvents: function(){
      var that = this;
      var io = require('socketio');
      that.socket = io.connect('/admin');
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
    _checkMobile: function() {
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
    toggleTreadMill: function(){
      var that = this;
      if (that.treadmill) {
        that.treadmill = false;
        that.socket.emit('not on treadmill');
      }
      else {
        that.treadmill = true;
        that.socket.emit('on treadmill');
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
        if (that.firstPassLoc) {
          $.ajax({
            type: "POST",
            url: "http://websteps.apps.swa.by/api/path",
            data: { lat: pos.coords.latitude, lng:  pos.coords.longitude, steps: that.steps }
          })
          .done(function( data ) {
            that.locationId = data._id;
            that.socket.emit('location update', { lat: pos.coords.latitude, lng:  pos.coords.longitude, id: that.locationId });
            that.firstPassLoc = false;
          })
          .fail(function (error) {
            console.log(error);
            window.alert("failure");
          });
        }
        else {
          that.socket.emit('location update', { lat: pos.coords.latitude, lng:  pos.coords.longitude, id: that.locationId });
        }
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
        that.$el.find("#toggle-section").animate({'height':'250px'}, 450);
        that.$el.find("#step-counter").animate({'height':'0'}, 450);
      }
      else if (that.mobile === true) {
        that.startPedometer();
        that.$el.find("#pedometer").html("pause pedometer");
        that.state.pedometerOn = true;
        that.$el.find("#toggle-section").animate({'height':'0'}, 450);
        that.$el.find("#step-counter").animate({'height':'250px'}, 450);
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
        high: 300,
        low: 80,
        falseStepMin: 3,
        falsStepMax: 50,
        delay: 25,
        locationUpdatePasses: 160
      };
      var runnningPeak = 700;
      var falseStepTracker = 0;
      var halfStep = 0;
      var stepState = "low";

      that.socket.emit('steps updated', { stepCount: that.steps, onTreadmill: that.treadmill });

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
            if (plotPoint >= config.high && falseStepTracker > config.falseStepMin) {
              if (falseStepTracker < config.falsStepMax) {
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
            if (plotPoint <= config.low && falseStepTracker > config.falseStepMin) {
              if (falseStepTracker < config.falsStepMax) {
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
          if (that.state.locationOn && !that.treadmill) {
            if (locationIntervalPasses === config.locationUpdatePasses) {
              that.updateLocation();
              locationIntervalPasses = 0;
            } 
            else {
              locationIntervalPasses++;
            }
          } 
          // else if (that.state.locationOn && that.treadmill && !that.locationId) {
          //   that.updateLocation();
          // }
        }, config.delay)
    }
  });

  return AdminStatusView;
});