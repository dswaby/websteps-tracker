define(function (require) {
  var Backbone = require('Backbone');
  require('async!http://maps.google.com/maps/api/js?sensor=false');

  var TrackedRunView = Backbone.View.extend({

    tagName: 'tr',
    template: require('hbs!./../../templates/TrackedRunView'),

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      // var mapIntervalId = window.setTimeout(this.createTravelPath, 500);
      // this.createTravelPath();
      // this.createTravelPath();
      return this;
    },
    initializeMap: function() {
      var that = this;
      var mapOptions = {
        zoom: 15,
        center: that.centerLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

      var travelPath = new google.maps.Polyline({
        path: that.pathCoordinates,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      travelPath.setMap(map);

    },
    createTravelPath: function() {
      var that = this;
      var coord = this.model.get("coordinates");
      that.pathCoordinates = [];
      for (var x = 0; x < coord.length; x++) {
        var latLong = new google.maps.LatLng(coord[x].lat, coord[x].lng);
        that.pathCoordinates.push(latLong);
      };
      that.centerLatLng = that.pathCoordinates[0];
      console.log(that.centerLatLng)
      this.initializeMap();

    }

  });

  return TrackedRunView;
});