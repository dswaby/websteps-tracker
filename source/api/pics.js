var fs = require("fs"),
    path = require("path"),
    util = require("util"),
    PhotoLog = require("./models/photoLog.js");

var pictures = function (router) {

  router.route('/api/pics').get(function (req, res) {
    var p = "./public/img/";
    PhotoLog.find(function(err, pics) {
      if (err) {
        return res.send(err);
      }
 
      return res.json(pics);
    });
  });

  router.route('/api/pics/:id').put(function (req, res) {
    PhotoLog.findOne({ _id: req.params.id }, function(err, pic) {
      if (err) {
        return res.send(err);
      }

      for (prop in req.body) {
        pic[prop] = req.body[prop];
      }

      // save the pic
      pic.save(function(err) {
        if (err) {
          return res.send(err);
        }

        res.json({ message: 'Picture Log updated!' });
      });
    });
  });

  router.route('/pics/:id').get(function(req, res) {
    PhotoLog.findOne({ _id: req.params.id}, function(err, pic) {
      if (err) {
        return res.send(err);
      }
   
      res.json(pic);
    });
  });

  router.route('/pics/:id').delete(function(req, res) {
    PhotoLog.remove({
      _id: req.params.id
    }, function(err, pic) {
      if (err) {
        return res.send(err);
      }
      res.json({ message: 'Successfully deleted' });
    });
  });

    // imageCollection = [];
    // fs.readdir(p, function (err, files) {
    //   if (err) {
    //     return err;
    //   }
    //   files.map(function (file) {
    //     return path.join(p, file);
    //   }).filter(function (file) {
    //     return fs.statSync(file).isFile();
    //   }).forEach(function (file) {
    //     if (path.extname(file).toString().toUpperCase() === '.JPG'|| path.extname(file).toString().toUpperCase() === '.PNG' || path.extname(file).toString().toUpperCase() === '.JPEG') {
    //       imageCollection.push({
    //         "path": "./img/"+ path.basename(file),
    //         "created": (fs.statSync(file).ctime).getTime()
    //       });
    //     }
    //   });
    //   if (err) {
    //     return err;
    //   }
    //   return res.json(imageCollection);
    // });
};


module.exports = pictures;