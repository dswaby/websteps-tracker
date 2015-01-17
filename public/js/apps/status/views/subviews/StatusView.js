define(function (require) {
  var Backbone = require('Backbone');
  var firstPass = true;
  require('async!http://maps.google.com/maps/api/js?sensor=false');
  var StatusView = Backbone.View.extend({
    template: require('hbs!./../../templates/StatusView'),
    className: 'location-wrapper',
    locationObj: {
      firstLocationPass: true,
      coordinates:[]
    },
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
      var firstPass = true;
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
        that.$el.find("#location").removeClass("icon-checkmark").addClass("icon-cross");
      });

      that.socket.on('stepcount', function (data){
        that.updateStepCount(data.steps);
      });

      that.socket.on('location', function (data){
        console.log("location recieved")
        if (that.locationObj.firstLocationPass) {
          that.$el.find("#location").removeClass("icon-cross").addClass("icon-checkmark");
          that.$el.find("#location-detail").removeClass("hidden");
          that.initializeMap(data.latitude, data.longitude);
          that.locationObj.firstLocationPass = false;
        }
        else {
          var myLatLong = new google.maps.LatLng(latitude, longitude);
          that.locationObj.coordinates.push(myLatLong);

          var travelPath = new google.maps.Polyline({
            path: that.locationObj.coordinates,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
          });

          travelPath.setMap(that.map);
          that.panMap(data.latitude, data.longitude);
        }
      });
    },
    initializeMap: function(latitude, longitude) {
      var that = this;
      var myLatLong = new google.maps.LatLng(latitude, longitude);
      var mapOptions = {
        zoom: 14,
        center: myLatLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      that.locationObj.coordinates.push(myLatLong);

      that.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

      that.marker = new google.maps.Marker({
        position: myLatLong,
        map: that.map,
        title: 'Dannys Location!'
      });
    },
    panMap: function(latitude, longitude) {
      var that = this;
      var newGeo = new google.maps.LatLng(latitude, longitude);
      that.map.panTo(newGeo);
    },
    updateStepCount: function(count) {
      var that = this;
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