var MapPath = require("./models/mapPath");

var path = function (router) {
  

  router.route('/api/path').post( function(req, res) {
    var path = new MapPath({
      coordinates: [{ lat: req.body.lat, lng: req.body.lng }]
    });
    
    path.save(function(err){
      if(err)
        res.send(err);
      });
    res.send( path );
  });

  router.route('/api/path/:id').get(function(req, res) {
    MapPath.findOne({ _id: req.params.id}, function(err, path) {
      if (err) {
        return res.send(err);
      }
   
      res.json(path);
    });
  });

  router.route('/api/path').get(function (req, res) {
    MapPath.find(function(err, paths) {
      if (err) {
        return res.send(err);
      }
      return res.json(paths);
    });
  });
};


module.exports = path;