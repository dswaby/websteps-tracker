define(function (require) {
  var Backbone = require('Backbone');

  var EntrySelectorView = Backbone.View.extend({
    template: require('hbs!./../../templates/EntrySelectorView'),
    className: 'entry-selector',
    render: function () {
      this.$el.html(this.template());
      return this;
    }
  });

  return EntrySelectorView;
});