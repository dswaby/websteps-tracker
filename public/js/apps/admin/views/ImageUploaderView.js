define(function (require) {
  var Backbone = require('Backbone');

  var ImageUploaderView = Backbone.View.extend({

    template: require('hbs!./../templates/ImageUploaderView'),
    className: 'admin-form',
    events: function () {

    },
    render: function () {
      this.$el.html(this.template());
      require('jQueryForm');
      var timerId = setInterval(function() {
        console.log(timerId);
        if($('#userPhotoInput').val() !== '') {
          clearInterval(timerId);
          $('#uploadForm').submit();
        }
      }, 500);
      $('#uploadForm').submit(function() {
        status('uploading the file ...');
 
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
            $('<img/>').attr('src', imageUrlOnServer).appendTo($('body'));
          }
        });

        return false;
      });

      function status(message) {
        $('#status').text(message);
      }

      return this;
    }
  });

  return ImageUploaderView;
});