define(function (require) {
  var Backbone = require('Backbone');
  var PictureModal = require('./PictureModal');
  var PictureView = Backbone.View.extend({
    tagName: 'div',
    className: 'picture-view picture-item',
    events: {
      'click .picture': 'showPictureModal'
    },
    template: require('hbs!./../../templates/PictureView'),
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    showPictureModal: function(e) {
      e.preventDefault();
      e.stopPropagation();
      var that = this;
      var pictureModal = new PictureModal({model: this.model});
      $('#modal').html(pictureModal.render().el);
    }
  });

  return PictureView;
});