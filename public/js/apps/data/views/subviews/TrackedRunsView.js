define(function(require) {
	var Backbone = require('Backbone');
  var TrackedRunView = require('./TrackedRunView');
	var TrackedRunsView = Backbone.View.extend({
    className: "tracked-runs-view",
		template: require('hbs!./../../templates/TrackedRunsView'),
    initialize: function () {
      this.subviews = [];
    },
		render: function () {
      this.$el.html(this.template());

      var runs = this.$('.runs');
      this.collection.forEach(function (run) {
        var view = new TrackedRunView({model: run});
        runs.append(view.render().el);
        this.subviews.push(view);
      }, this);

      return this;
		}
	});

	return TrackedRunsView;
});