define(function (require) {
  var Backbone = require('Backbone');
  var MapModal = require('./../../../../views/subviews/MapModal');
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
      var that = this;
      e.preventDefault();
      e.stopPropagation();
      var mapModal = new MapModal({model: this.model});
      $('#modal').html(mapModal.render().el);
    }

  });

  return TrackedRunView;
});