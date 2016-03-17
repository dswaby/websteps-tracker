define( function( require ) {
  var TrackedRunsCollection = require( './collections/TrackedRunsCollection' );
  var LoadingView = require( './../../common/loader/views/LoaderView' );
  var MainView = require( './views/MainView' );


  return {
    run: function( viewManager ) {
      var that = this;
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

      var fetchingRuns = getRuns;
      
      $.when(fetchingRuns).done(function(runs){
        var runsFormatted = runs.forEach(function( run ) {
          console.log(run)
        } )
        var view = new MainView({ collection: runs });
        viewManager.show(view);
      });
    }
  };
} );
