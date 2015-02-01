define(function(require) {
  var Backbone = require('Backbone');

  var Status = Backbone.Model.extend({
    defaults: {
      mobile:false,
      locationId: '',
      steps: 0,
      state: {},
      firstPassLoc: true,
      treadmill: false
    }
  });

  return Status;
});