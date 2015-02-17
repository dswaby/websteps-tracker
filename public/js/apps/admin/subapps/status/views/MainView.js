define(function (require) {
  var Backbone = require('Backbone');

  var AdminStatusView = require('./subviews/AdminStatusView');
  var StatusModel = require('./../models/Status');

  var MainView = Backbone.View.extend({
    className: "admin-status-view",
    initialize: function () {
      this.subviews = [];
    },

    render: function () {
      var status = new StatusModel();
      var StatusView = new AdminStatusView({model: status});
      this.$el.append(StatusView.render().el);
      this.subviews.push(StatusView);
      return this;
    }
  });

  return MainView;
});