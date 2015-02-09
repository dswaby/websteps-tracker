define(function (require) {
  var Backbone = require('Backbone');

  var AboutView = Backbone.View.extend({
    className: "demo-view",
    template: require('hbs!./../templates/DemoView'),
    initialize: function () {
      this.subviews = [];
    },

    render: function () {
      var headerView = new HeaderView();
      this.subviews.push(headerView);
      this.$el.append(headerView.render().el);

      return this;
    }
  });
  return AboutView;
});