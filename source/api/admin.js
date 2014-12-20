var fs = require("fs"),
    path = require("path"),
    util = require("util");
var maxSize = 800000000;


var admin = function (app) {

  app.post('/api/admin', function(req, res) {
    var serverPath = './public/img/' + req.files.userPhoto.name;
    var publicPath = './img/' + req.files.userPhoto.name;
    
    if (req.files.userPhoto.size > maxSize) {
      res.send({error : 'file size exeeded maximum, file size was '+ req.files.userPhoto.size +' and max is 7.6M'});
      return;
    }
    if (req.files.userPhoto.type !== "image/jpeg" && req.files.userPhoto.type !== 'image/gif' && req.files.userPhoto.type !== 'image/png') {
      res.send({error : 'not photo'});
      return;
    }


    require('fs').rename(req.files.userPhoto.path, serverPath, function(error) {
      if (error) {
        res.send({ error: 'Ah crap! Something bad happened'});
        return;
      }

      res.send({
        path: publicPath
      });

    });
  });
};

module.exports = admin;
