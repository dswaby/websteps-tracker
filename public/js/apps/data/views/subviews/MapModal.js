define(function (require) {
  var Backbone = require('Backbone');
  require('backboneModal');
  
  var MapModal = Backbone.Modal.extend({
    template: require('hbs!./../../templates/MapModal'),
    cancelEl: '.bbm-button',
    locationObj: {
      coordinates:[]
    },
    initializeMap: function(latitude, longitude) {
      var that = this;
      var myLatLong = new google.maps.LatLng(latitude, longitude);
      var mapOptions = {
        zoom: 12,
        center: myLatLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      that.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      that.travelPath = new google.maps.Polyline({
        path: that.locationObj.coordinates,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      that.travelPath.setMap(that.map);

    },
    initialize: function() {
      var that = this;
      require(['async!http://maps.google.com/maps/api/js?sensor=false'], function(){
        var path = that.model.get("coordinates");
        for (var i = 0; i < path.length; i++) {
          var myLatLong = new google.maps.LatLng(path[i].lat, path[i].lng);
          that.locationObj.coordinates.push(myLatLong);
        }
        that.initializeMap(path[0].lat, path[0].lng);
      });
    },
    beforeCancel: function() {
      var that = this;
      that.locationObj.coordinates = [];
      that.travelPath.setMap(null);
    }
  });

  return MapModal;
});