define(function(require) {
  var Backbone = require('Backbone');

  var TrackedRun = Backbone.Model.extend({
    urlRoot: '/api/path'
  });

  return TrackedRun;
});