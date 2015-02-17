define(function (require) {
  var Backbone = require('Backbone');
  var firstPass = true;
  require('async!http://maps.google.com/maps/api/js?sensor=false');
  var StatusView = Backbone.View.extend({
    template: require('hbs!./../../templates/StatusView'),
    events: {
      'click #ping-button': 'pingForStatus'
    },
    className: 'location-wrapper',
    locationObj: {
      firstLocationPass: true,
      coordinates:[]
    },
    onTreadmill: false,
    checkPing: function () {
      if(typeof(Storage) !== "undefined") {
        var pingStorage = localStorage.getItem("pingtime");
        if (pingStorage && (Date.now() - pingStorage.getMilliseconds()) > 30000000) {
          this.$el.find("#ping-button").removeClass("active").addClass("pinged");
        }
      }
    },
    render: function () {
      var io = require('socketio');
      this.$el.html(this.template());
      this.socket = io.connect('/');
      this._socketEvents();
      return this;
    },
    _socketEvents: function(){
      var firstPass = true;
      this.socket.emit('get connection status');
      // this.socket.on(
      this.socket.on('danny is connected', function(){
        this.$el.find("#connection").removeClass("icon-cross").addClass("icon-checkmark");
        this.$el.find("#ping-button").removeClass("active").addClass("disabled");
      });

      this.socket.on('danny is disconnected', function(){
        this.$el.find("#ping-button").removeClass("disabled").addClass("active");
        this.$el.find("#connection").removeClass("icon-checkmark").addClass("icon-cross");
        this.$el.find("#activity-detail").addClass("hidden");
        this.$el.find("#activity").removeClass("icon-checkmark").addClass("icon-cross");
        this.$el.find("#location-detail").addClass("hidden");
        this.$el.find("#location").removeClass("icon-checkmark").addClass("icon-cross");
      });

        this.socket.on('stepcount', function (data){
          this.updateStepCount(data.steps);
          if (data.treadmill && !this.onTreadmill) {
            this.$el.find("#treadmill-bool").html("True");
            this.onTreadmill = true;
          }
          else if (!data.treadmill && this.onTreadmill) {
            this.$el.find("#treadmill-bool").html("False");
            this.onTreadmill = false;
          }
        });

        this.socket.on('location', function (data){
          if (this.locationObj.firstLocationPass) {
            this.$el.find("#location").removeClass("icon-cross").addClass("icon-checkmark");
            this.$el.find("#location-detail").removeClass("hidden");

            $.ajax({
              type: "GET",
              url: "http://websteps.apps.swa.by/api/path/" + data.id
            })
            .done(function (path) {
                this.initializeMap(path.coordinates[0].lat, path.coordinates[0].lng);
                for (var i = 0; i < path.coordinates.length; i++) {
                  var myLatLong = new google.maps.LatLng(path.coordinates[i].lat, path.coordinates[i].lng);
                  this.locationObj.coordinates.push(myLatLong);
                }
              this.locationObj.firstLocationPass = false;
              if (data.lat && data.lng) {
                this.updatePath(data.lat, data.lng);
              }
            })
            .fail(function (error) {
              console.log(error);
            });
            
          }
          else {
            var myLatLong = new google.maps.LatLng(data.lat, data.lng);
            this.locationObj.coordinates.push(myLatLong);
            this.updatePath(data.lat, data.lng);
          }
        });

        // this.socket.on('on treadmill', function (data){
        //   this.$el.find("#treadmill-bool").html("True");
        // });

        // this.socket.on('not on treadmill', function (data){
        //   this.$el.find("#treadmill-bool").html("False");
        // });
    },
    updatePath: function(lat, lng){
      var travelPath = new google.maps.Polyline({
        path: this.locationObj.coordinates,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      travelPath.setMap(this.map);
      this.panMap(lat, lng);
    },

    initializeMap: function(latitude, longitude) {
      var myLatLong = new google.maps.LatLng(latitude, longitude);
      var mapOptions = {
        zoom: 17,
        center: myLatLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.locationObj.coordinates.push(myLatLong);

      this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

      this.marker = new google.maps.Marker({
        position: myLatLong,
        map: this.map,
        title: 'Starting Point!'
      });
    },

    panMap: function(latitude, longitude) {
      var newGeo = new google.maps.LatLng(latitude, longitude);
      this.map.panTo(newGeo);
    },

    updateStepCount: function(count) {
      if (firstPass) {
        this.$el.find("#activity").removeClass("icon-cross").addClass("icon-checkmark");
        // TODO apply revealing transition to 
        this.$el.find("#activity-detail").removeClass("hidden");
        firstPass = false;
      }
      this.$el.find("#stepcount").html(count);
    },

    onClose: function(){
      this.socket.disconnect();
      console.log("disconnected!")
    },

    pingForStatus: function(e) {
      e.preventDefault();
      e.stopPropagation();
      $.ajax({
        type: "POST",
        url: "http://websteps.apps.swa.by/api/ping",
        data: ""
      })
      .done(function (data) {
        this.$el.find("#ping-button").removeClass("active").addClass("pinged");
      })
      .fail(function (error) {
        console.log(error);
      });
      
      if(typeof(Storage) !== "undefined") {
        localStorage.setItem("pingtime", Date.now());
      }
    }
  });

  return StatusView;
});