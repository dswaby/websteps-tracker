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
};


module.exports = path;