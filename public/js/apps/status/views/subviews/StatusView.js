define(function (require) {
  var Backbone = require('Backbone');
  var firstPass = true;

  var StatusView = Backbone.View.extend({
    template: require('hbs!./../../templates/StatusView'),
    className: 'location-wrapper',
    render: function () {
      var that = this;
      var io = require('socketio');

      this.$el.html(this.template());
      that.socket = io.connect('/');
      this._socketEvents();
      return this;
    },
    _socketEvents: function(){
      var that = this;
      that.socket.emit('get connection status');

      that.socket.on('danny is connected', function(){
        console.log("danny is connected");
        that.$el.find("#connection").removeClass("icon-cross").addClass("icon-checkmark");
      });
      that.socket.on('danny is disconnected', function(){
        console.log("danny is disconnected");
        that.$el.find("#connection").removeClass("icon-checkmark").addClass("icon-cross");
        that.$el.find("#activity-detail").addClass("hidden");
        that.$el.find("#activity").removeClass("icon-checkmark").addClass("icon-cross");
        that.$el.find("#location-detail").addClass("hidden");

      });
      that.socket.on('stepcount', function (data){
        that.updateStepCount(data.steps);
      });
      that.socket.on('location', function (data){
        var embedString = '<iframe width="300" height="170" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?q='+data.latitude+','+data.longitude+'&hl=es;z=14&amp;output=embed"></iframe>';
        that.$el.find("#location").removeClass("icon-cross").addClass("icon-checkmark");
        that.$el.find("#activity-detail").removeClass("hidden");
        that.$el.find("#map-view").html(embedString);
        // console.log('latitude: %s, longitude: %s', data.latitude, data.longitude);
      });
    },
    renderLocation: function() {

    },
    updateStepCount: function(count) {
      var that = this;
      console.log(count);
      if (firstPass) {
        that.$el.find("#activity").removeClass("icon-cross").addClass("icon-checkmark");
        // apply revealing transition to 
        that.$el.find("#activity-detail").removeClass("hidden");
        firstPass = false;
      }
      that.$el.find("#stepcount").html(count);
    }
  });

  return StatusView;
});