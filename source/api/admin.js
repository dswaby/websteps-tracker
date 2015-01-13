var StatusEntry = require("./models/glucoseLog");

var admin = function (app) {
  app.post('/api/admin/status', function(req, res) {

      StatusEntry.find(function(err, status) {
      if (err) {
        return res.send(err);
      }
      if (status.length) {
        for (prop in req.body) {
            status[prop] = req.body[prop];
          }

          status.save(function(err) {
            if (err) {
              return res.send(err);
          }

          res.json({ message: 'Status Updated!' });

        });
      }
 
      return res.json(status);
    });

      glucoseEntry.save(function(err, entry){
        if(err)
          res.send(err);
        });
        res.send();
  });

  app.get('/api/admin/status', function(req, res) {

      glucoseEntry.save(function(err, entry){
        if(err)
          res.send(err);
        });
        res.send();
  });
};

module.exports = admin;
