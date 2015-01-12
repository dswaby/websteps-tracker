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
      var data = { 
        glucoseLevel: $("#glucoseLevel").val(),
        timeSinceEating: $("#timeSinceEating").val(), 
        notes: $("#glucoseComments").val() 
      };
      console.log(data)
      $.ajax({
        type: "POST",
        url: "/api/glucose",
        data: data
      }).done(function( msg ) {
        console.log(msg)
      });
    }
  });

  return GluscoseEntryView;
});