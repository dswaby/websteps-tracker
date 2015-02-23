define(function(require) {
	var Backbone = require('Backbone');

	var TrackedRunsView = require('./subviews/TrackedRunsView');
  var PicsCollectionView = require('./subviews/PicturesView');
  var GlucoseChartView = require('./subviews/GlucoseChartView');


	var MainView = Backbone.View.extend({
    className: 'main-data-view',
    template: require('hbs!./../templates/MainView'),
    
    // template: 
    events: {
      'click .js-trails': 'scrollTrails',
      'click .js-uploads': 'scrollUploads',
      'click .js-glucose': 'scrollGlucose'
    },
    transition: {
      in : "bounceInUp",
      out: "bounceOutLeft",
      delay: 450
    },
		initialize: function () {
      var that = this;
			this.subviews = [];
      this.section = "trails";
		},
    onClose: function() {
      this.stopListening();
    },
    calculateScrollTops: function() {
      var that = this;
      that.trailTop = $(document).find("#header").height(); 
      that.uploadsTop = - ($(window).height() - that.trailTop);
      that.glucoseTop = - $(window).height() + that.trailTop - $(window).height();
    },

		render: function () {
      this.$el.html(this.template());
      var $routesSection = this.$('#map-routes-section');
      var $picsSection = this.$('#pics-section');
      var $glucoseSection = this.$("#glucose-section");

			var trackedRunsView = new TrackedRunsView({collection: this.model.get("runs")});
			$routesSection.append(trackedRunsView.render().el);
			this.subviews.push(trackedRunsView);
      this.listenTo(trackedRunsView, "below", function() {
        this.$el.animate({top: this.uploadsTop}, 500);
        this.section = "uploads";
      });

      var picsCollectionView = new PicsCollectionView({collection: this.model.get("pics")});
      $picsSection.append(picsCollectionView.render().el);
      this.subviews.push(picsCollectionView);
      this.listenTo(picsCollectionView, "below", function() {
        this.$el.animate({top: this.glucoseTop}, 500);
        this.section = "glucose";
      });

      var glucoseView = new GlucoseChartView();
      $glucoseSection.append(glucoseView.render().el);
      this.subviews.push(glucoseView);

      // calculate scroll targets and ready prepare for resize
      this.calculateScrollTops();
      this.handleResize();
			return this;
		},
    scrollTrails: function(e){
      e.preventDefault();
      e.stopPropagation();
      var that = this;
      this.$el.animate({top: that.trailTop}, 500);
      that.section = "trails";
    },
    scrollUploads: function(e){
      e.preventDefault();
      e.stopPropagation();
      var that = this;
      this.$el.animate({top: that.uploadsTop}, 500);
      that.section = "uploads";
    },
    scrollGlucose: function(e) {
      e.preventDefault();
      e.stopPropagation();
      var that = this;
      this.$el.animate({top: that.glucoseTop}, 500);
      that.section = "glucose";
    },
    handleResize: function() {
      var that = this;
      window.addEventListener("resize", resizeThrottler, false);
      var resizeTimeout;
      function resizeThrottler() {
        // ignore resize events as long as an actualResizeHandler execution is in the queue
        if ( !resizeTimeout ) {
          resizeTimeout = setTimeout(function() {
            resizeTimeout = null;
            actualResizeHandler();
         
           // The actualResizeHandler will execute at a rate of 15fps
           }, 66);
        }
      }

      function actualResizeHandler() {
        $(".page-section").css("height", $(window).height());
        that.calculateScrollTops();
        switch (that.section) { 
          case "trails": //Statements executed when the result of expression matches value1 
            that.$el.css({top: that.trailTop});
            break; 
          case "uploads":
            that.$el.css({top: that.uploadsTop});
            break;
          case "glucose":
            that.$el.css({top: that.glucoseTop});
            break; //Statements executed the result of expression matches value2 [break;] ... case valueN: //Statements executed when the result of expression matches valueN [break;] 
          default: 
            console.log("error")
        }
      }
    }
	});

	return MainView;
});