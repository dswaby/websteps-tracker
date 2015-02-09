define(function (require) {
  var Backbone = require('Backbone');
  require('backboneModal');
  var PictureModal = Backbone.Modal.extend({
    template: require('hbs!./../../templates/PictureModal'),
    cancelEl: '.bbm-button'
  });

  return PictureModal;
});