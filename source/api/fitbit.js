var fs = require("fs"),
    path = require("path"),
    util = require("util");

var pictures = function (app) {

  app.get('/api/fitbit',
    getImages,
    returnImages
  );

  function getImages(req, res, next) {
    var p = "./public/img/";

    imageCollection = [];
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
          console.log(imageCollection)
          imageCollection.push({
            "path": "./img/"+ path.basename(file),
            "created": (fs.statSync(file).ctime).getTime()
          });
        }
      });
    });

    return next (null, imageCollection);
  }

  function returnImages(req, res, next) {
    console.log(req)
    var imageCollection = req.body;
    res.json(imageCollection);
  }
};


module.exports = pictures;