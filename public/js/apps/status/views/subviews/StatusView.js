define(function (require) {
  var Backbone = require('Backbone');
  var io = require('socketio');

  var StatusView = Backbone.View.extend({
    template: require('hbs!./../../templates/StatusView'),
    className: 'location-wrapper',
    render: function () {
      var that = this;
      this.$el.html(this.template());
      that.socket = io.connect('http://fitb.apps.swa.by/');
      this._socketEvents();
      return this;
    },
    _socketEvents: function(){
      var that = this;
      that.socket.emit('get connection status');

            
      // that.socket.on('news', function (data) {

      // });
      that.socket.on('danny is connected', function(){
        console.log("danny is connected");
        that.$el.find("#connection").removeClass("icon-cross").addClass("icon-checkmark");
      });
      that.socket.on('danny is disconnected', function(){
        console.log("danny is disconnected");
        that.$el.find("#connection").removeClass("icon-checkmark").addClass("icon-cross");
      });
      that.socket.on('stepcount', function(data){
        that.updateStepCount(data.steps);
      });
    },
    startLoop: function() {
      var that = this;

    },
    renderMap: function() {

    },
    updateStepCount: function(count) {
      var that = this;
      that.$el.find("stepcount").innerHTML = count;
    }
  });

  return StatusView;
});