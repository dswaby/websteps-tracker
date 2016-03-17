define( function( require ) {
  var TrackedRunsCollection = require( './../../collections/TrackedRunsCollection' );
  var LoadingView = require( './../../../../common/loader/views/LoaderView' );
  var MainView = require( './views/MainView' );


  return {
    run: function( viewManager ) {
      var that = this;
      // display loading view here
      var loader = new LoadingView();
      viewManager.show( loader );

      function getRuns() {
        var runCollection = new TrackedRunsCollection();
        var defer = $.Deferred();
        runCollection.fetch( {
          success: function( data ) {
            defer.resolve( data );
          },
          fail: function( error ) {
            console.log( error );
          }
        } );
        return defer.promise();
      };

      getRuns().done( function( runs ) {
        var formattedRuns = runs.map( function( run ) {
          if ( run.has( "distance" ) ) {
            var d = run.get( "distance" );
            var formattedD = Math.round( d * 10 ) / 10;
            (d) 
              ? run.set( "distance", formattedD)
              : run.set("distance","under 0.1");
          }
          else {
            run.set("distance unavailable")
          }
          return run;
        } );
        var view = new MainView( { collection: formattedRuns.reverse() } );
        viewManager.show( view );
      } );
    }
  };
} );
