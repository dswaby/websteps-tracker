define(function (require) {
  var Backbone = require('Backbone');

  var AboutView = Backbone.View.extend({
    className: "demo-view",
    template: require('hbs!./../templates/DemoView'),
    initialize: function () {
      this.subviews = [];
    },

    render: function () {
      var homeView = new HomeView();
      this.subviews.push(homeView);
      this.$el.append(homeView.render().el);

      return this;
    }
  });
  return AboutView;
});