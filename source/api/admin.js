var fs = require("fs"),
    path = require("path"),
    util = require("util"),
    crypto = require('crypto'),
    multipart = require('connect-multiparty'),
    PhotoLog = require("./models/photoLog"),
    GlucoseEntry = require("./models/glucoseLog");

var admin = function (app) {
  var multipartMiddleware = multipart();
  var date = new Date();

  app.post('/api/admin/pics', multipartMiddleware, function(req, res) {
    var serverPath = './public/pics/' + date.toISOString() + req.files.userPhoto.name;
    var publicPath = './pics/' + date.toISOString() + req.files.userPhoto.name;

    if (req.files.userPhoto.type !== "image/jpeg" && req.files.userPhoto.type !== 'image/gif' && req.files.userPhoto.type !== 'image/png') {
      res.send({error : 'not photo'});
      return;
    }

    require('fs').rename(req.files.userPhoto.path, serverPath, function(error) {
    var fingerprint;
      if (error) {
        res.send({ error: 'Something bad happened' });
        return;
      }
      var photoLog = new PhotoLog({
        imagePath: publicPath,
        comments: req.body.optionalPhotoComments
      });
      
      photoLog.save(function(err){
        if(err)
            res.send(err);
      });

      res.send({
        path: publicPath
      });

    });
  });

//   var glucoseLog =  new Schema({
//   dateCreated: { type: Date, default: Date.now },
//   glucoseLevel: Number,
//   comments: String
// });{ glucoseLevel: '44', timeSinceEating: '44', notes: 'notes' }

  app.post('/api/admin/glucose', function(req, res) {

      var glucoseEntry = new GlucoseEntry({
        glucoseLevel: req.body.glucoseLevel,
        timeSinceEating: req.body.timeSinceEating,
        comments: req.body.notes
      });

      glucoseEntry.save(function(err, entry){
        if(err){
          res.send(err);
          return;
        }
        res.send(entry);
      })
  })
};

module.exports = admin;
