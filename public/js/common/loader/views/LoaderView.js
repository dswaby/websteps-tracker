define(function (require) {
  var Backbone = require('Backbone');
  
  var LoaderView = Backbone.View.extend({
    className: "loader-view",
    transition: {
      in : "",
      out: "",
      delay: 0
    },
    template: require('hbs!./../templates/Loader'),
    render: function () {
      this.$el.html(this.template());
      return this;
    }
  });

  return LoaderView;
});