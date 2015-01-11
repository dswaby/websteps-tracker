define(function (require) {
  var Backbone = require('Backbone');

  var StatusView = Backbone.View.extend({
    template: require('hbs!./../templates/StatusView'),

    render: function () {
      this.$el.html(this.template());
      return this;
    }
  });

  return StatusView;
});