define('templates/helpers/dateFormatter', ['hbs/handlebars', 'moment'], function ( Handlebars, moment ) {

  function dateFormatter ( context, options ) {
    // Simple function for example
    var f = block.hash.format || "MMM Do, YYYY";
    return moment(Date(context)).format(f);
  }

  Handlebars.registerHelper( 'dateFormatter', dateFormatter );
  
  return dateFormatter;
});