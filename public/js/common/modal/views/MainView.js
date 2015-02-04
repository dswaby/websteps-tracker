define(function(require) {
  var Backbone = require('Backbone');

  var ModalView = Backbone.View.extend({
    events: {
      'click div.close-button': 'closeDialog'
    }
    template: require('../templates/ModalView'),
    
    className: 'modal-view',

    initialize: function () {
      this.subviews = [];
    },
    
    hideModal: function(){
      this.trigger( "closeModalWindow");

      $(document.body).unbind( "keyup", this.keyup);

      var container = this.modalContainer;
      $(this.modalContainer)
    },
    closeDialog: function() {

      // remove nested view

      this.hideModal();
    },
    render: function () {
      this.subviews.push();

      return this;
    }
  });

  return ModalView;
});