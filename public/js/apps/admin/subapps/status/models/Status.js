define(function(require) {
  var Backbone = require('Backbone');

  var Status = Backbone.Model.extend({
    urlRoot: '/api/status'
  });

  return Status;
});