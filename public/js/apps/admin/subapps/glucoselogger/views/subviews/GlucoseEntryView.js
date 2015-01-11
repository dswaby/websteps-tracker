define(function (require) {
  var Backbone = require('Backbone');
  var dispatcher = _.clone(Backbone.Events);

  var GluscoseEntryView = Backbone.View.extend({

    template: require('hbs!./../../templates/GlucoseEntryView'),
    className: 'glucose-form',
    events: {
      'click #submit-button': 'submit'
    },
    render: function () {
      
      this.$el.html(this.template());
      
      return this;
    },
    submit: function(e) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "/api/admin/glucose",
        data: { glucoseLevel: $("#glucoseLevel").val(), timeSinceEating: $("#timeSinceEating").val(), notes: $("#glucoseComments").val() }
      }).done(function( msg ) {
        console.log(msg)
      });
    }
  });

  return GluscoseEntryView;
});