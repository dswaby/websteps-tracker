define(function (require) {
  var Backbone = require('Backbone');
  var TrackedRun = require('./../models/TrackedRun');

  var TrackedRunsCollection = Backbone.Collection.extend({
    model: TrackedRun,

    url: '/api/path'
  });

  return TrackedRunsCollection;
});