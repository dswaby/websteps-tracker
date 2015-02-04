define('apps/data/templates/helpers/formatDate', ['hbs/handlebars'], function ( Handlebars ) {
  function formatDate ( context, options ) {
    // Simple function for example
    console.log(context)
    var d = new Date(context);
    return d.toDateString();
  }
  Handlebars.registerHelper( 'formatDate', formatDate );
  return formatDate;
});