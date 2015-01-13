define(function (require) {
  var Backbone = require('Backbone');

  var LocationView = Backbone.View.extend({
    template: require('hbs!./../../templates/LocationView'),

    render: function () {
      this.$el.html(this.template());
      //start polling
      //update views
      return this;
    }
  });

  return LocationView;
});