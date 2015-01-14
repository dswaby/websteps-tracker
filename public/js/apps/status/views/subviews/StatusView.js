define(function (require) {
  var Backbone = require('Backbone');
  var io = require('socketio');

  var StatusView = Backbone.View.extend({
    template: require('hbs!./../../templates/StatusView'),
    className: 'location-wrapper',
    render: function () {
      this.$el.html(this.template());
      //start polling
      //update views
      this.connectSocket();
      return this;
    },
    connectSocket: function(){
      var that = this;
      that.socket = io.connect('http://fitb.apps.swa.by');      
      that.socket.on('news', function (data) {
        that.socket.emit('get connection status');

      });
      that.socket.on('danny is connected', function(){
        console.log("danny is connected");
        that.$el.find("#no-connection").addClass("hidden");
        that.$el.find("#connected").removeClass("hidden");
      });
      that.socket.on('stepcount', function(data){
        console.log("stepcount", data );
      });
    }
  });

  return StatusView;
});