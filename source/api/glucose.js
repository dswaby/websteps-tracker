var fs = require("fs"),
    path = require("path"),
    util = require("util"),
    GlucoseEntry = require("./models/glucoseLog");

var glucose = function (app) {

  app.post('/api/glucose', function(req, res) {
      var glucoseEntry = new GlucoseEntry({
        glucoseLevel: req.body.glucoseLevel,
        timeSinceEating: req.body.timeSinceEating,
        comments: req.body.notes
      });

      glucoseEntry.save(function(err, entry){
        if(err) {
          res.send(err);
        }
        res.send(glucoseEntry);
      });

  });
};

module.exports = glucose;
