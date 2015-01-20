define(function (require) {
  var Backbone = require('Backbone');
  var FitbitStat = require('./../models/FitbitStat');

  var TrackedRunsCollection = Backbone.Collection.extend({
    model: FitbitStat,

    url: '/api/path'
  });

  return TrackedRunsCollection;
});