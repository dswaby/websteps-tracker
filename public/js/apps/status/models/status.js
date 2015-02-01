define(function(require) {
  var Backbone = require('Backbone');

  var Status = Backbone.Model.extend({
    defaults: {
      locationObj: {
        firstLocationPass: true,
        coordinates:[]
      }
    }
  });

  return Status;
});