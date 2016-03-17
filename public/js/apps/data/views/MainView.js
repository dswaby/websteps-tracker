define( function( require ) {
  var Backbone = require( 'Backbone' );

  var TrackedRunsView = require( './subviews/TrackedRunsView' );

  var MainView = Backbone.View.extend( {
    className: 'main-data-view',
    template: require( 'hbs!./../templates/MainView' ),
    events: {
      'click .js-trails': 'scrollTrails',
      'click .js-uploads': 'scrollUploads',
      'click .js-glucose': 'scrollGlucose'
    },
    transition: { in : "bounceInUp",
      out: "bounceOutLeft",
      delay: 450
    },
    initialize: function() {
      var that = this;
      this.subviews = [];
      this.section = "trails";
    },
    onClose: function() {
      this.stopListening();
    },

    render: function() {
      this.$el.html( this.template() );
      var $routesSection = this.$( '#map-routes-section' );
      var $picsSection = this.$( '#pics-section' );
      var $glucoseSection = this.$( "#glucose-section" );

      var trackedRunsView = new TrackedRunsView( { collection: this.model.get( "runs" ) } );
      $routesSection.append( trackedRunsView.render().el );
      this.subviews.push( trackedRunsView );
      this.listenTo( trackedRunsView, "below", function() {
        this.$el.animate( { top: this.uploadsTop }, 500 );
        this.section = "uploads";
      } );
      return this;
    }
  } );

  return MainView;
} );
