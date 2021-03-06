define(function(require) {
  var Backbone = require('Backbone');
  var PictureView = require('./PictureView');

  var PicturesView = Backbone.View.extend({
    template: require('hbs!./../../templates/PicturesView'),
    className: "pictures-view picture-grid",
    initialize: function () {
      this.subviews = [];
    },

    render: function () {
      this.$el.html(this.template());

      var pictures = this.$('.pictures');

      this.collection.forEach(function (picture) {
        var view = new PictureView({model: picture});
        pictures.append(view.render().el);
        this.subviews.push(view);
      }, this);

      return this;
    }
  });

  return PicturesView;
});