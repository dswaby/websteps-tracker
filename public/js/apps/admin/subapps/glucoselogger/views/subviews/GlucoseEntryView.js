define(function (require) {
  var Backbone = require('Backbone');
  var dispatcher = _.clone(Backbone.Events);

  var GluscoseEntryView = Backbone.View.extend({

    template: require('hbs!./../../templates/GlucoseEntryView'),
    className: 'glucose-form',
    events: function () {
      // 'click .form': 'submit'
    },
    render: function () {

      var $el = this.$el;

      this.$ = function (sel) {
        return this.$el.find(sel);
      };
      
      $el.html(this.template());

      $el.find('#submit-button').submit(function() {
        $('#uploadForm').submit();
      });
      
      $el.find('form').on('submit', function(e) {
          e.preventDefault();
      });

      function status(message) {
        $el.find('#admin-status').text(message);
      }
      return this;
    }
  });

  return GluscoseEntryView;
});