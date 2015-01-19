function SocketEvents(server) {
  var io = require('socket.io')(server);
  var admin_io =  io.of('/admin');
  var MapPath = require("./models/mapPath");


  // ('/') global namespace event handlers
  io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.broadcast.emit('user connected');

    socket.on('get connection status', function (data) {
      admin_io.emit('is danny connected');
    });
  });

  // '/admin' namespace event handlers 
  admin_io.on('connection', function (socket) {
    io.emit('danny is connected');
    socket.on('danny is connected', function () {
      io.emit('danny is connected');
    });
    socket.on('steps updated', function (data) {
      io.emit('stepcount', { steps: data.stepCount });
    });
    socket.on('disconnect', function(){
      io.emit('danny is disconnected');
    });
    socket.on('location error', function (data) {
      console.log("location error", data.error);
    });
    socket.on('location', function (data){
      // data.lat, data.lng
      io.emit('location', { lat: data.lat, lng: data.lng });
    });

    // add point to existing mapPath document
    socket.on('location update', function (data) {
      // data._id, data.lat, data.lng
      io.emit('location', { lat: data.lat, lng: data.lng, id: data.id });
      MapPath.findOne({ _id: data.id }, function(err, mapPath) {
        if (err) {
          console.log(err);
          return;
        }
        mapPath.coordinates.push({ lat: data.lat, lng: data.lng });
       // save the mapPath
        mapPath.save(function(err) {
          if (err) {
            console.log(err);
            return;
          }
          console.log("map path document " + data.id + " successfully updated");
        });
      });
    });


  });

}

module.exports = SocketEvents;