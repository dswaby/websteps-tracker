define(function (require) {
  var Backbone = require('Backbone');

  var Picture = Backbone.Model.extend({
    urlRoot: '/api/pics'
  });

  return Picture;
});