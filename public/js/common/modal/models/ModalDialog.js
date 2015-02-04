define(function(require) {
  var Backbone = require('Backbone');

  var ModalDialogModel = Backbone.Model.extend({
    defaults: {
      title: 'Default Title',
      message: '',
      imageUrl: ''
    }
  });

  return ModalDialogModel;
});