define(function (require) {
  var Backbone = require('Backbone');
  require('async!http://maps.google.com/maps/api/js?sensor=false');
  var MapModal = require('./MapModal');
  var TrackedRunView = Backbone.View.extend({
    className: 'tracked-run-item-view',
    tagName: 'tr',
    template: require('hbs!./../../templates/TrackedRunView'),
    events: {
      'click a':'showMap'
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    showMap: function(e){
      e.preventDefault();
      e.stopPropagation();
      var that = this;

      var mapModal = new MapModal({});
      $('#modal').html(mapModal.render().el);
    }

  });

  return TrackedRunView;
});