define(function(require) {
  var Backbone = require('Backbone');

  var PhotoLog = Backbone.Model.extend({
    urlRoot: '/api/pics'
  });

  return PhotoLog;
});