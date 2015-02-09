define(function (require) {
  var Backbone = require('Backbone');
  
  var intervalId;
  var watchid;
  var DemoView = Backbone.View.extend({
    mobile:false,
    steps: 0,
    state: {},
    treadmill: false,
    firstPassLoc: true,
    template: require('hbs!./../templates/DemoView'),
    className: 'demo-view',
    events: {
      'click #pedometer-toggle': 'togglePedometer',
    },
    render: function () {
      this.$el.html(this.template());
      this._checkMobile();
      return this;
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
        that.$el.find("#step-container").toggle();
        that.$el.find("#unsupported").removeClass("hidden");
        that.unbind();
        // that.$el.html("<div class='unsupported'>Browser is not supported</div>");
        console.log("browser not supported");
      }
    },
    togglePedometer: function() {
      var that = this;
        if (that.state.pedometerOn) {
          clearInterval(intervalId);
          that.$el.find("#pedometer-toggle").html("start pedometer");
          that.state.pedometerOn = false;
        }
        else if (that.mobile === true) {
          that.startPedometer();
          that.$el.find("#pedometer-toggle").html("pause pedometer");
          that.state.pedometerOn = true;
        }
        else {
          
          // this should  not have been reached
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
        delay: 15
      };
      var falseStepTracker = 0;
      var halfStep = 0;
      var stepState = "low";

      if (window.DeviceMotionEvent==undefined) {
        return false;
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
              document.getElementById("steps").innerHTML = that.steps;
            } else {
              falseStepTracker = 0;
            }
          }
          else {
            falseStepTracker++;
          }
        }
      }, config.delay)
    }
  });

  return DemoView;
});