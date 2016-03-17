define( function( require ) {
  var PicturesCollection = require( './collections/PicturesCollection' );
  var MainView = require( './views/MainView' );

  return {
    run: function( viewManager ) {
      var picturesCollection = new PicturesCollection();
      picturesCollection.fetch( {
        success: function( picturesCollection ) {
          var view = new MainView( { collection: picturesCollection } );
          viewManager.show( view );
        }
      } );
    }
  };
} );
