define(function (require) {
  var Backbone = require('Backbone');
  require('async!http://maps.google.com/maps/api/js?sensor=false');

  var TrackedRunView = Backbone.View.extend({


    template: require('hbs!./../../templates/TrackedRunView'),

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      // this.createTravelPath();
      return this;
    },
    initializeMap: function() {

    },
    createTravelPath: function() {
      var that = this;
      var coord = this.model.get("coordinates");
      that.pathCoordinates = [];
      console.log(coord)
      for (var x = 0; x < coord.length; x++) {
        // console.log("inner for", this);
        var latLong = new google.maps.LatLng(coord[x].lat, coord[x].lng);
        that.pathCoordinates.push(latLong);
      };
      console.log(that.pathCoordinates)
      // var travelPath = new google.maps.Polyline({
      //   path: that.locationObj.coordinates,
      //   strokeColor: '#FF0000',
      //   strokeOpacity: 1.0,
      //   strokeWeight: 2
      // });

      // travelPath.setMap(that.map);
    }

  });

  return TrackedRunView;
});

// var myLatLong = new google.maps.LatLng(latitude, longitude);
//       var mapOptions = {
//         zoom: 17,
//         center: myLatLong,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//       };
//       that.locationObj.coordinates.push(myLatLong);

//       that.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

//       that.marker = new google.maps.Marker({
//         position: myLatLong,
//         map: that.map,
//         title: 'Starting Point!'
//       });