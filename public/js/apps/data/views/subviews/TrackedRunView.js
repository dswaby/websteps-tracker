define(function (require) {
  var Backbone = require('Backbone');
  require('async!http://maps.google.com/maps/api/js?sensor=false');

  var TrackedRunView = Backbone.View.extend({


    template: require('hbs!./../../templates/TrackedRunView'),

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      console.log("model to json",this.model.toJSON());
      this.createTravelPath();
      return this;
    },
    initializeMap: function() {

    },
    createTravelPath: function() {
      var that = this;
      this.pathCoordinates = [];
      for (var x = 0; x < this.model.get("coordinates"); x++) {
        console.log("inner for", this);
        // var latLong = new google.maps.LatLng(latitude, longitude);
      }
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