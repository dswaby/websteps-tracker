define(function(require) {
  var Backbone = require('Backbone');
  var PictureView = require('./PictureView');

  var PicturesView = Backbone.View.extend({
    template: require('hbs!./../../templates/PicturesView'),
    className: "pics-collection-view",
    events: {
      
    },
    initialize: function () {
      this.subviews = [];
    },
    render: function () {
      this.$el.html(this.template());

      var pictures = this.$('.pictures');
      var count;
      if (this.collection.length > 12) {
        count = 12;
      }
      else {
        count = this.collection.length;
      }

      for (var i = 0; i < count; i++) {
        index = this.collection.length - (i + 1);
        var view = new PictureView({model: this.collection.at(index)});
        pictures.append(view.render().el);
        this.subviews.push(view);
      }

      return this;
    }
  });

  return PicturesView;
});