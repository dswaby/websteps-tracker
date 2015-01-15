define(function (require) {
  var Backbone = require('Backbone');
  var dispatcher = _.clone(Backbone.Events);
  require('jQueryForm');

  var ImageUploaderView = Backbone.View.extend({
    

    template: require('hbs!./../../templates/ImageUploaderView'),
    className: 'admin-form',
    events: function () {

    },
    render: function () {

      var $el = this.$el;

      this.$ = function (sel) {
        return this.$el.find(sel);
      };
      
      $el.html(this.template());

      $('#submit-button').on("submit", function() {
        $('#uploadForm').submit();
      });

      $('#uploadForm').submit(function() {
        status('uploading the file ...');
        console.log($this)
        $(this).ajaxSubmit({                                                                                                                 
          error: function(xhr) {
            status('Error: ' + xhr.status);
          },
          success: function(response) {
            if(response.error) {
              status('Opps, something bad happened');
              return;
            }
            var imageUrlOnServer = response.path;
            status('Success, file uploaded to:' + imageUrlOnServer);
            $('#uploadedImage').attr('src', imageUrlOnServer);
          }
        });
        return false;
      });
      
      $el.find('form').on('submit', function(e) {
          e.preventDefault(); // prevent native submit
      });

      function status(message) {
        $el.find('#admin-status').text(message);
      }
      return this;
    }
  });

  return ImageUploaderView;
});
