var fs = require("fs"),
    path = require("path"),
    util = require("util");

var pictures = function (app) {

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
        if (path.extname(file).toString().toUpperCase() === '.JPG'|| path.extname(file).toString().toUpperCase() === '.PNG' || path.extname(file).toString().toUpperCase() === '.jpeg') {
          console.log(fs.statSync(file));
          images.push({
            "path": file,
            "created": (fs.statSync(file).ctime).getTime()
          });
        }
    });
  });

  app.get('/api/fitbit', function (req, res) {
      res.json(images);
  });
};

module.exports = pictures;