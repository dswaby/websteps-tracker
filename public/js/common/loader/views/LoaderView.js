define(function (require) {
  var Backbone = require('Backbone');
  
  var LoaderView = Backbone.View.extend({
    className: "loader-view",
    template: require('hbs!./../templates/Loader'),
    render: function () {
      this.$el.html(this.template());
      return this;
    }
  });

  return LoaderView;
});