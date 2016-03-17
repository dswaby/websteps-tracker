define( function( require ) {
    var Backbone = require( 'Backbone' );

    var EntrySelectorView = require( './subviews/EntrySelectorView' );

    var MainView = Backbone.View.extend( {
        className: "admin-main-view",

        initialize: function() {
            this.subviews = [];
        },
        render: function() {
            var entrySelectorView = new EntrySelectorView();
            this.$el.append( entrySelectorView.render().el );

            return this;
        }
    } );

    return MainView;
} );
