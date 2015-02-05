define(function(require) {
	var Backbone = require('Backbone');

	var TrackedRunsView = require('./subviews/TrackedRunsView');
  var PicsCollectionView = require('./subviews/PicturesView');

	var MainView = Backbone.View.extend({
    className: 'main-data-view',
		initialize: function () {
			this.subviews = [];
		},

		render: function () {
			var trackedRunsView = new TrackedRunsView({collection: this.model.get("runs")});
			this.$el.append(trackedRunsView.render().el);
			this.subviews.push(trackedRunsView);

      var picsCollectionView = new PicsCollectionView({collection: this.model.get("pics")});
      this.$el.append(picsCollectionView.render().el);
      this.subviews.push(picsCollectionView);
			return this;
		}
	});

	return MainView;
});