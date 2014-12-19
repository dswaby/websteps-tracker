var fs = require("fs"),
    path = require("path"),
    util = require("util");


var admin = function (app) {

  app.post('/api/admin', function(req, res) {
   
    var serverPath = './public/img/' + req.files.userPhoto.name;

    require('fs').rename(req.files.userPhoto.path,
      serverPath, 
      function(error) {
      if(error) {
        console.log(error);
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
