define(function (require) {
  var Backbone = require('Backbone');
  require('backboneModal');
  var MapModal = Backbone.Modal.extend({
    template: require('hbs!./../../templates/MapModal'),
    cancelEl: '.bbm-button'
  });

  return MapModal;
});