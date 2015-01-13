define(function(require) {
  var Backbone = require('Backbone');

  var StatusView = require('./subviews/StatusView');
  var LocationView = require('./subviews/LocationView');

  var MainView = Backbone.View.extend({
    className: 'main-status-view',
    initialize: function () {
      this.subviews = [];
    },

    render: function () {
      var statusView = new StatusView({collection: this.collection});
      this.$el.append(statusView.render().el);
      this.subviews.push(statusView);
      var locationView = new LocationView();
      this.$el.append(locationView.render().el);
      return this;
    }
  });

  return MainView;
});