define(function(require) {
  var Backbone = require('Backbone');

  var StatusView = require('./subviews/StatusView');
  var LocationView = require('./subviews/LocationView');
  var StatusModel = require('./../models/status');
  var MainView = Backbone.View.extend({
    className: 'main-status-view',
    initialize: function () {
      this.subviews = [];
    },

    render: function () {
      var status = new StatusModel();
      var statusView = new StatusView({model: status});
      this.$el.append(statusView.render().el);
      this.subviews.push(statusView);
      var locationView = new LocationView();
      this.$el.append(locationView.render().el);
      return this;
    }
  });

  return MainView;
});