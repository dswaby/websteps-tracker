define(function (require) {
  var Backbone = require('Backbone');

  var PictureView = Backbone.View.extend({
    tagName: 'div',
    className: 'picture-view picture-item',

    template: require('hbs!./../../templates/PictureView'),

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  return PictureView;
});