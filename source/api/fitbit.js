var fs = require("fs"),
    path = require("path"),
    util = require("util");

var pictures = function (app) {



  app.get('/api/fitbit', function (req, res) {
    var p = "./public/img/";
    var images = [];
    fs.readdir(p, function (err, files) {
      if (err) {
        throw err;
      }
      files.map(function (file) {
        return path.join(p, file);
      }).filter(function (file) {
        return fs.statSync(file).isFile();
      }).forEach(function (file) {
        console.log(file)
          if (path.extname(file).toString().toUpperCase() === '.JPG'|| path.extname(file).toString().toUpperCase() === '.PNG' || path.extname(file).toString().toUpperCase() === '.jpeg') {
            images.push({
              "path": "./img/"+ path.basename(file),
              "created": (fs.statSync(file).ctime).getTime()
            });
          }
      });
    });
      res.json(images);
  });
};

module.exports = pictures;