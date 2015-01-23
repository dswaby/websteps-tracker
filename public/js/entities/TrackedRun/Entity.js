define(function(require) {

  var Backbone = require('Backbone');
  var Entities = {};
  _.extend(Entities, Backbone.Events);

  Entities.TrackedRun = Backbone.Model.extend({
    urlRoot: '/api/path'
  });

  Entities.TrackedRunsCollection = Backbone.Collection.extend({
    model: Entities.TrackedRun,
    url: '/api/path'
  });

  API = {
    getTrackedRunEntities: function(){
      var trackedRuns = new Entities.ContactCollection();
      var defer = $.Deferred();
      trackedRuns.fetch({
        success: function(data){
          defer.resolve(data);
        }
      });
      var promise = defer.promise();
      return promise;
    },
    getTrackedRunEntity: function(trackedRunId){
      var trackedRun = new Entities.TrackedRun({id: trackedRunId});
      var defer = $.Deferred();
      trackedRun.fetch({
        success: function(data){
          defer.resolve(data);
        },
        error: function(data){
          defer.resolve(undefined);
        }
      });
      return defer.promise();
    }
  };

  Entities.on("trackedrun:entities", function(){
    return API.getTrackedRunEntities();
  });

  Entities.on("trackedrun:entity", function(id){
    return API.getTrackedRunEntity(id);
  });
});