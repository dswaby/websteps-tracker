define(function(require) {
	var Backbone = require('Backbone');
  var TrackedRunView = require('./TrackedRunView');
	var TrackedRunsView = Backbone.View.extend({
    className: "trackedrun-collection-view",
		template: require('hbs!./../../templates/TrackedRunsView'),
    events:{
      'click #all-tracked-routes':'showAllMaps'
    },
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
		},
    showAllMaps: function(e){
      e.preventDefault();
      console.log("view all clicked");
    }
	});

	return TrackedRunsView;
});