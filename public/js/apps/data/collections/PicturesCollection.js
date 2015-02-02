define(function (require) {
  var Backbone = require('Backbone');
  var Picture = require('./../models/Picture');

  var PicturesCollection = Backbone.Collection.extend({
    model: Picture,

    url: '/api/pics'
  });

  return PicturesCollection;
});