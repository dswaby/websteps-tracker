function SocketEvents( server ) {
  var io = require( 'socket.io' )( server );
  var admin_io = io.of( '/admin' );
  var MapPath = require( "./models/mapPath" );
  var nodemailer = require( 'nodemailer' );
  var DIAMETER_IN_MILES = 2 * 3963.190;

  function distance( a, b, c, d, e, z ) { with( Math ) return z = PI / 360, e * atan2( sqrt( z = pow( sin( ( c - a ) * z ), 2 ) + cos( a * z * 2 ) * cos( c * z * 2 ) * pow( sin( ( d - b ) * z ), 2 ) ), sqrt( 1 - z ) ) };

  // ('/') global namespace event handlers
  io.on( 'connection', function( socket ) {
    socket.emit( 'news', { hello: 'world' } );
    socket.broadcast.emit( 'user connected' );
    socket.on( 'get connection status', function( data ) {
      admin_io.emit( 'is danny connected' );
    } );
  } );

  // '/admin' namespace event handlers 
  admin_io.on( 'connection', function( socket ) {
    socket.emit( 'news' );
    io.emit( 'danny is connected' );
    socket.on( 'danny is connected', function() {
      io.emit( 'danny is connected' );
    } );
    socket.on( 'steps updated', function( data ) {
      io.emit( 'stepcount', { steps: data.stepCount, treadmill: data.onTreadmill } );
    } );
    socket.on( 'disconnect', function() {
      io.emit( 'danny is disconnected' );
    } );
    socket.on( 'location error', function( data ) {
      console.log( "location error", data.error );
    } );

    // add point to existing mapPath document
    // data { _id, lat, lng }
    socket.on( 'location update', function( data ) {
      io.emit( 'location', { lat: data.lat, lng: data.lng, id: data.id } );
      MapPath.findOne( { _id: data.id }, function( err, mapPath ) {
        if ( err ) {
          console.log( err );
          return;
        }

        var ahora = Date.now();

        var last = mapPath.coordinates[ mapPath.coordinates.length - 1 ];
        var miles = distance( last.lat, last.lng, data.lat, data.lng, DIAMETER_IN_MILES );

        if ( miles > 0.00378788 ) {
          // only add coordinate if it is more than twenty feet
          mapPath.coordinates.push( { lat: data.lat, lng: data.lng } );
          mapPath.distance += miles;
        };
        if ( data.steps ) {
          mapPath.steps = data.steps;
        }

        mapPath.last = ahora;

        mapPath.save( function( err ) {
          if ( err ) {
            console.log( err );
            return;
          }
          // console.log("map path document " + data.id + " successfully updated");
        } );
      } );
    } );
  } );

}

module.exports = SocketEvents;
