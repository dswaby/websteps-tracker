define(function (require) {
  var Backbone = require('Backbone');
  var TrackedRun = require('./../models/TrackedRun');

  var TrackedRunsCollection = Backbone.Collection.extend({
    model: TrackedRun,
    url: 'http://websteps.apps.swa.by/api/path'
  });

  return TrackedRunsCollection;
});