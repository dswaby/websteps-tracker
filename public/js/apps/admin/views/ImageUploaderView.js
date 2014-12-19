define(function (require) {
  var Backbone = require('Backbone');
  require('jQueryForm');

  var ImageUploaderView = Backbone.View.extend({

    template: require('hbs!./../templates/ImageUploaderView'),
    className: 'admin-form',
    events: function () {

    },
    render: function () {
      this.$el.html(this.template());


      return this;
    }
  });

  return ImageUploaderView;
});