define('template/helpers/formatDate', ['handlebars'], function ( Handlebars ) {
  function formatDate ( context, options ) {
    var d = new Date(context);
    return d.toDateString();
  }
  Handlebars.registerHelper( 'formatDate', formatDate );
  return formatDate;
});