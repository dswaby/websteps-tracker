define(function (require) {
  var Backbone = require('Backbone');

  var StatusUpdaterView = require('./subviews/StatusView');

  var MainView = Backbone.View.extend({
    className: "admin-view",
    
    initialize: function () {
    },

    render: function () {
      var StatusView = new StatusUpdaterView();
      this.$el.append(StatusView.render().el);
      return this;
    }
  });

  return MainView;
});