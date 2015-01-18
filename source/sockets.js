function SocketEvents(server) {
  var io = require('socket.io')(server);
  var admin_io =  io.of('/admin');

  // 
  io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.broadcast.emit('user connected');
    socket.on('my other event', function (data) {
      console.log(data);
    });

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
      recent.stepCount = data.stepCount;
    });
    socket.on('disconnect', function(){
      io.emit('danny is disconnected');
    });
    socket.on('location error', function (data) {
      console.log("location error", data.error);
    })
    socket.on('location', function (data){
      console.log('latitude: %s, longitude: %s', data.latitude, data.longitude);
      io.emit('location', { latitude: data.latitude, longitude: data.longitude });
    });
  });

}

module.exports = SocketEvents;