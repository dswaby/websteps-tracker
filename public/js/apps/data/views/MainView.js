define(function(require) {
	var Backbone = require('Backbone');

	var TrackedRunsView = require('./subviews/TrackedRunsView');
  var PicsCollectionView = require('./subviews/PicturesView');

	var MainView = Backbone.View.extend({
    className: 'main-data-view',
    template: require('hbs!./../templates/MainView'),
    // template: 
		initialize: function () {
			this.subviews = [];
		},

		render: function () {
      this.$el.html(this.template());
      var $routesSection = this.$('#map-routes-section');
      var $picsSection = this.$('#pics-section');

			var trackedRunsView = new TrackedRunsView({collection: this.model.get("runs")});
			$routesSection.append(trackedRunsView.render().el);
			this.subviews.push(trackedRunsView);

      var picsCollectionView = new PicsCollectionView({collection: this.model.get("pics")});
      $picsSection.append(picsCollectionView.render().el);
      this.subviews.push(picsCollectionView);
			return this;
		}
	});

	return MainView;
});