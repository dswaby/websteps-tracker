define(function (require) {
  var Backbone = require('Backbone');

  var DemoView = Backbone.View.extend({
    className: "demo-view",
    template: require('hbs!./../templates/DemoView'),
    render: function () {
      var headerView = new HeaderView();
      this.$el.append(headerView.render().el);

      return this;
    }
  });
  return DemoView;
});