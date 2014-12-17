define(function(require) {
  var Backbone = require('Backbone');
  var PictureView = require('./PictureView');

  var FitBitVizView = Backbone.View.extend({
    template: require('hbs!./../../templates/PicturesView'),

    initialize: function () {
      this.subviews = [];
    },

    render: function () {
      this.$el.html(this.template());

      var pictures = this.$('.pictures');
      console.log(this);
      this.collection.forEach(function (picture) {
        var view = new PictureView({model: picture});
        pictures.append(view.render().el);
        this.subviews.push(view);
      }, this);

      return this;
    }
  });

  return FitBitVizView;
});