define(function (require) {
  var Backbone = require('Backbone');

  var Picture = Backbone.Model.extend({
    urlRoot: '/api/fitbit'
  });

  return Picture;
});