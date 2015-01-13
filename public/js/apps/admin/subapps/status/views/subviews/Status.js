define(function (require) {
  var Backbone = require('Backbone');

  var StatusView = Backbone.View.extend({
    template: require('hbs!./../../templates/StatusView'),
    className: 'location-wrapper',
    render: function () {
      this.$el.html(this.template());
      //start polling
      //update views
      return this;
    }
  });

  return StatusView;
});