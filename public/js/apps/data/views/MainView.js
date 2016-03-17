define( function( require ) {
  var Backbone = require( 'Backbone' );
  var TrackedRunsView = require( './subviews/TrackedRunsView' );

  var MainView = Backbone.View.extend( {
    className: 'main-data-view',
    template: require( 'hbs!./../templates/MainView' ),
    events: {
      'click .js-trails': 'scrollTrails'
    },
    transition: { in : "bounceInUp",
      out: "bounceOutLeft",
      delay: 450
    },
    initialize: function() {
      var that = this;
      this.subviews = [];
    },
    onClose: function() {
      this.stopListening();
    },
    render: function() {
      this.$el.html( this.template() );

      var $routesSection = this.$( '#map-routes-section' );
      var trackedRunsView = new TrackedRunsView( { collection: this.collection } );

      $routesSection.append( trackedRunsView.render().el );
      this.subviews.push( trackedRunsView );

      return this;
    }
  } );

  return MainView;
} );
