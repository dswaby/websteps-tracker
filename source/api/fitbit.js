var fs = require("fs"),
    path = require("path"),
    util = require("util");
var PhotoLog = require("./models/photoLog.js");
var pictures = function (router) {
  router.route('/api/fitbit').get(function(req, res) {
    var p = "./public/img/";

    imageCollection = [];
    fs.readdir(p, function (err, files) {
      if (err) {
        return next(err);
      }
      files.map(function (file) {
        return path.join(p, file);
      }).filter(function (file) {
        return fs.statSync(file).isFile();
      }).forEach(function (file) {
        if (path.extname(file).toString().toUpperCase() === '.JPG'|| path.extname(file).toString().toUpperCase() === '.PNG' || path.extname(file).toString().toUpperCase() === '.JPEG') {
          imageCollection.push({
            "path": "./img/"+ path.basename(file),
            "created": (fs.statSync(file).ctime).getTime()
          });
        }
      });
      return res.json(imageCollection);

    });
  });
};


module.exports = pictures;