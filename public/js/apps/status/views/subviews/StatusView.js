define( function( require ) {
  var Backbone = require( 'Backbone' );
  var firstPass = true;
  require( 'async!http://maps.google.com/maps/api/js?sensor=false' );
  var StatusView = Backbone.View.extend( {
    template: require( 'hbs!./../../templates/StatusView' ),
    className: 'location-wrapper',
    locationObj: {
      firstLocationPass: true,
      coordinates: []
    },
    onTreadmill: false,
    checkPing: function() {
      if ( typeof( Storage ) !== "undefined" ) {
        var pingStorage = localStorage.getItem( "pingtime" );
        if ( pingStorage && ( Date.now() - pingStorage.getMilliseconds() ) > 30000000 ) {
          that.$el.find( "#ping-button" ).removeClass( "active" ).addClass( "pinged" );
        }
      }
    },
    render: function() {
      var that = this;
      var io = require( 'socketio' );
      this.$el.html( this.template() );
      that.socket = io.connect( '/' );
      this._socketEvents();
      return this;
    },
    _socketEvents: function() {
      var that = this;
      that.socket.emit( 'get connection status' );
      // that.socket.on(
      that.socket.on( 'danny is connected', function() {
        that.$el.find( "#connection" ).removeClass( "icon-cross" ).addClass( "icon-checkmark" );
        that.$el.find( "#status-text").replaceWith("")
        // that.$el.find("#ping-button").removeClass("active").addClass("disabled");
      } );

      that.socket.on( 'danny is disconnected', function() {
        // that.$el.find("#ping-button").removeClass("disabled").addClass("active");
        that.$el.find( "#connection" ).removeClass( "icon-checkmark" ).addClass( "icon-cross" );
        that.$el.find( "#activity-detail" ).addClass( "hidden" );
        that.$el.find( "#activity" ).removeClass( "icon-checkmark" ).addClass( "icon-cross" );
        that.$el.find( "#location-detail" ).addClass( "hidden" );
        that.$el.find( "#location" ).removeClass( "icon-checkmark" ).addClass( "icon-cross" );
        firstPass = true;
        that.locationObj.firstLocationPass = true;
      } );

      that.socket.on( 'stepcount', function( data ) {
        that.updateStepCount( data.steps );
        if ( data.treadmill && !that.onTreadmill ) {
          that.$el.find( "#treadmill-bool" ).html( "True" );
          that.onTreadmill = true;
        } else if ( !data.treadmill && that.onTreadmill ) {
          that.$el.find( "#treadmill-bool" ).html( "False" );
          that.onTreadmill = false;
        }
      } );

      that.socket.on( 'location', function( data ) {
        if ( that.locationObj.firstLocationPass ) {
          that.$el.find( "#location" ).removeClass( "icon-cross" ).addClass( "icon-checkmark" );
          that.$el.find( "#location-detail" ).removeClass( "hidden" );

          $.ajax( {
              type: "GET",
              url: "http://websteps.apps.swa.by/api/path/" + data.id
            } )
            .done( function( path ) {
              that.initializeMap( path.coordinates[ 0 ].lat, path.coordinates[ 0 ].lng );
              for ( var i = 0; i < path.coordinates.length; i++ ) {
                var myLatLong = new google.maps.LatLng( path.coordinates[ i ].lat, path.coordinates[ i ].lng );
                that.locationObj.coordinates.push( myLatLong );
              }
              that.locationObj.firstLocationPass = false;
              if ( data.lat && data.lng ) {
                that.updatePath( data.lat, data.lng );
              }
            } )
            .fail( function( error ) {
              console.log( error );
            } );

        } else {
          var myLatLong = new google.maps.LatLng( data.lat, data.lng );
          that.locationObj.coordinates.push( myLatLong );
          that.updatePath( data.lat, data.lng );
        }
      } );

      // that.socket.on('on treadmill', function (data){
      //   that.$el.find("#treadmill-bool").html("True");
      // });

      // that.socket.on('not on treadmill', function (data){
      //   that.$el.find("#treadmill-bool").html("False");
      // });
    },
    updatePath: function( lat, lng ) {
      var that = this;
      var travelPath = new google.maps.Polyline( {
        path: that.locationObj.coordinates,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      } );

      travelPath.setMap( that.map );
      that.panMap( lat, lng );
    },

    initializeMap: function( latitude, longitude ) {
      var that = this;
      var myLatLong = new google.maps.LatLng( latitude, longitude );
      var mapOptions = {
        zoom: 17,
        center: myLatLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      that.locationObj.coordinates.push( myLatLong );

      that.map = new google.maps.Map( document.getElementById( 'map-canvas' ), mapOptions );

      that.marker = new google.maps.Marker( {
        position: myLatLong,
        map: that.map,
        title: 'Starting Point!'
      } );
    },

    panMap: function( latitude, longitude ) {
      var that = this;
      var newGeo = new google.maps.LatLng( latitude, longitude );
      that.map.panTo( newGeo );
    },

    updateStepCount: function( count ) {
      var that = this;
      if ( firstPass ) {
        that.$el.find( "#activity" ).removeClass( "icon-cross" ).addClass( "icon-checkmark" );
        // TODO apply revealing transition to 
        that.$el.find( "#activity-detail" ).removeClass( "hidden" );
        firstPass = false;
      }
      that.$el.find( "#stepcount" ).html( count );
    },

    onClose: function() {
      var that = this;
      that.socket.disconnect();
    }
  } );

  return StatusView;
} );
