define(function (require) {
  var Backbone = require('Backbone');

  var StatusUpdaterView = require('./subviews/StatusView');

  var MainView = Backbone.View.extend({
    className: "admin-view",
    
    initialize: function () {
    },

    render: function () {
      var pedometerView = new StatusUpdaterView();
      this.$el.append(pedometerView.render().el);
      return this;
    }
  });

  return MainView;
});