define(function(require) {
	var Backbone = require('Backbone');

	var TrackedRunsView = require('./subviews/TrackedRunsView');
  var PicsCollectionView = require('./subviews/PicturesView');

	var MainView = Backbone.View.extend({
    className: 'main-data-view',
    template: require('hbs!./../templates/MainView'),
    transition: {
      in : "bounceInUp",
      out: "bounceOutLeft",
      delay: 450
    }, 
    // template: 
    events: {
      'click #trails': 'scrollTrails',
      'click #uploads': 'scrollUploads',
      'click #glucose': 'scrollGlucose'
    },
		initialize: function () {
      var that = this;
			this.subviews = [];
      
		},
    calculateScrollTops: function() {
      var that = this;
      that.trailTop = document.getElementById("routes-page").parentNode.parentNode.offsetTop;
      that.uploadsTop = - ($(window).height() - that.trailTop);
      that.glucoseTop = - $(window).height() + that.trailTop - $(window).height();
      console.log(this);
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
      this.calculateScrollTops();
			return this;
		},
    scrollTrails: function(e){
      e.preventDefault();
      e.stopPropagation();
      var that = this;
      if (!that.trailTop) {
        that.calculateScrollTops();
      }
      this.$el.animate({top: that.trailTop}, 500);
    },
    scrollUploads: function(e){
      e.preventDefault();
      e.stopPropagation();
      var that = this;
      this.$el.animate({top: that.uploadsTop}, 500);
    },
    scrollGlucose: function(e) {
      e.preventDefault();
      e.stopPropagation();
      var that = this;
      this.$el.animate({top: that.glucoseTop}, 500);
    }
	});

	return MainView;
});