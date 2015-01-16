define(function (require) {
  var Backbone = require('Backbone');

  var AdminStatusView = require('./subviews/AdminStatusView');

  var MainView = Backbone.View.extend({
    className: "admin-status-view",
    
    initialize: function () {
    },

    render: function () {
      var StatusView = new AdminStatusView();
      this.$el.append(StatusView.render().el);
      return this;
    }
  });

  return MainView;
});