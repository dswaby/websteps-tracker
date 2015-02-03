var MapPath = require("./models/mapPath");
var nodemailer = require('nodemailer');

var ping = function(app) {


  // create reusable transporter object using SMTP transport


    // ('/') global namespace event handlers
  app.post('/api/ping', function(req, res) {
    if (req.connection) {
      console.log(req.connection);
    }
    if (req.headers) {
      console.log(req.headers);
    }
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'ping@swa.by',
            pass: 'q4TY)x[sMq9(Zkk}vh3R7eDEVyKHU;44/KE6WJN7V&W'
        }
    });
    // console.log(req)
    
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
          res.send("pinged");
          console.log('Message sent: ' + info.response);
        }
    });
  });
};

module.exports = ping;