var fs = require("fs"),
    path = require("path"),
    util = require("util"),
    multiparty = require('connect-multiparty'),
    PhotoLog = require("./models/photoLog.js");

var pictures = function (router) {

  var multipartMiddleware = multiparty();
  var date = new Date();

  router.post('/api/pics', multipartMiddleware, function(req, res) {
    var serverPath = './public/pics/' + date.toISOString() + req.files.userPhoto.name;
    var publicPath = './pics/' + date.toISOString() + req.files.userPhoto.name;

    if (req.files.userPhoto.type !== "image/jpeg" && req.files.userPhoto.type !== 'image/gif' && req.files.userPhoto.type !== 'image/png') {
      res.send({error : 'not photo'});
      return;
    }
    console.log(req)
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

  router.route('/api/pics').get(function (req, res) {
    var p = "./public/pics/";
    PhotoLog.find(function(err, pics) {
      if (err) {
        return res.send(err);
      }
 
      return res.json(pics);
    });
  });

  router.route('/api/pics/recent').get(function (req, res) {
    var p = "./public/pics/";

    var oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);


    PhotoLog.find({"dateCreated": { "$lt": oneWeekAgo.setDate(oneWeekAgo.getDate() - 7) }}).limit(5).exec(function (err, pics){
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
    //         "path": "./pics/"+ path.basename(file),
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