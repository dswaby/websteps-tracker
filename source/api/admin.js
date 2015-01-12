var fs = require("fs"),
    path = require("path"),
    util = require("util"),
    crypto = require('crypto'),
    multipart = require('connect-multiparty'),
    PhotoLog = require("./models/photoLog"),
    GlucoseEntry = require("./models/glucoseLog");

var admin = function (app) {

//   var glucoseLog =  new Schema({
//   dateCreated: { type: Date, default: Date.now },
//   glucoseLevel: Number,
//   comments: String
// });{ glucoseLevel: '44', timeSinceEating: '44', notes: 'notes' }

  app.post('/api/admin/glucose', function(req, res) {

      var glucoseEntry = new GlucoseEntry({
        glucoseLevel: req.body.glucoseLevel,
        timeSinceEating: req.body.timeSinceEating,
        comments: req.body.notes
      });

      glucoseEntry.save(function(err, entry){
        if(err)
          res.send(err);
        });
        res.send();
  });
};

module.exports = admin;
