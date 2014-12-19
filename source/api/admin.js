var fs = require("fs"),
    path = require("path"),
    util = require("util");


var admin = function (app) {

  app.post('/api/photos', function(req, res) {
   
    var serverPath = '/images/' + req.files.userPhoto.name;

    require('fs').rename(
    req.files.userPhoto.path,
    '/Users/mark/code/examples/file-upload/upload-example-app/public' + serverPath,
    function(error) {
      if(error) {
        res.send({ error: 'Ah crap! Something bad happened'});
        return;
      }

      res.send({
        path: serverPath
      });
    });
  });
};

module.exports = admin;
