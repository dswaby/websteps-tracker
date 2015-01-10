define(function (require) {
  var Backbone = require('Backbone');

  var GlucoseEntryView = require('./subviews/GlucoseEntryView');

  var MainView = Backbone.View.extend({
    initialize: function () {
      this.subviews = [];
    },

    render: function () {
      var glucoseEntryView = new GlucoseEntryView();
      this.subviews.push(glucoseEntryView);
      this.$el.append(glucoseEntryView.render().el);
      return this;
    }
  });

  return MainView;
});