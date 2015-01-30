function SocketEvents(server) {
  var io = require('socket.io')(server);
  var admin_io =  io.of('/admin');
  var MapPath = require("./models/mapPath");
  var nodemailer = require('nodemailer');

  // create reusable transporter object using SMTP transport
  var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'ping@swa.by',
          pass: 'q4TY)x[sMq9(Zkk}vh3R7eDEVyKHU;44/KE6WJN7V&W'
      }
  });

  // ('/') global namespace event handlers
  io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.broadcast.emit('user connected');

    socket.on('get connection status', function (data) {
      admin_io.emit('is danny connected');
    });

    socket.on('status ping', function (data) {
      var mailOptions = {
          from: 'Zing Pingman ✔ <ping@swa.by>', // sender address
          to: 'danny@swa.by', // list of receivers
          subject: 'fitb.apps.swa.by ping', // Subject line
          text: 'Youve been pinged!' // plaintext body
      };
      // send mail with defined transport object
      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              console.log(error);
          }else{
              console.log('Message sent: ' + info.response);
          }
      });
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

    // add point to existing mapPath document
    // data { _id, lat, lng }
    socket.on('location update', function (data) {
      io.emit('location', { lat: data.lat, lng: data.lng, id: data.id });
      MapPath.findOne({ _id: data.id }, function(err, mapPath) {
        if (err) {
          console.log(err);
          return;
        }
        
        mapPath.coordinates.push({ lat: data.lat, lng: data.lng });
        mapPath.endedAt = Date.now;

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