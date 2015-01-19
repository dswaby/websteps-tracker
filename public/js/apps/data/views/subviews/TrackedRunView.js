define(function (require) {
  var Backbone = require('Backbone');

  var TrackedRunView = Backbone.View.extend({
    tagName: 'tr',

    template: require('hbs!./../../templates/TrackedRunView'),

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  return TrackedRunView;
});