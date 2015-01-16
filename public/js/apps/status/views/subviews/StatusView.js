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
        that.$el.find("#activity").removeClass("icon-checkmark").addClass("icon-cross");
      });
      that.socket.on('stepcount', function(data){
        console.log(data)
        that.updateStepCount(data.steps);
      });
    },
    startLoop: function() {
      var that = this;

    },
    renderLocation: function() {

    },
    updateStepCount: function(count) {
      var that = this;
      console.log(count)
      if (firstPass) {
        that.$el.find("#activity").removeClass("icon-cross").addClass("icon-checkmark");
        // apply revealing transition to 
        that.$el.find("#activity-detail").removeClass("hidden");
        firstPass = false;
      }
      that.$el.find("#stepcount").innerHTML = count;
    }
  });

  return StatusView;
});