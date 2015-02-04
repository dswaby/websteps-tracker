define(function(require) {
	var Backbone = require('Backbone');
  var TrackedRunView = require('./TrackedRunView');
	var TrackedRunsView = Backbone.View.extend({
    className: "trackedrun-collection-view",
		template: require('hbs!./../../templates/TrackedRunsView'),
    initialize: function () {
      this.subviews = [];
    },
		render: function () {
      this.$el.html(this.template());

      var runs = this.$('.runs');
      for (var i; i < this.collection.length && i < 10; i++) {
        var view = new TrackedRunView({model: run});
      }
      var count;
      if (this.collection.length > 10) {
        count = 10;
      }
      else {
        count = this.collection.length;
      }

      for (var i = 0; i < count; i++) {
        index = this.collection.length - (i + 1);
        var view = new TrackedRunView({model: this.collection.at(index)});
        runs.append(view.render().el);
        this.subviews.push(view);
      }

      return this;
		}
	});

	return TrackedRunsView;
});