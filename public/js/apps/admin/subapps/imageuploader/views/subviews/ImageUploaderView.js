define(function (require) {
  var Backbone = require('Backbone');
  var dispatcher = _.clone(Backbone.Events);
  require('jQueryForm');

  var ImageUploaderView = Backbone.View.extend({
    

    template: require('hbs!./../../templates/ImageUploaderView'),
    className: 'admin-form',

    events: {
      'click button#submit-button': 'submitForm'
    },
    render: function () {

      // var $el = this.$el;

      // this.$ = function (sel) {
      //   return this.$el.find(sel);
      // };
      
      this.$el.html(this.template());

      // $el.find('form').on('submit', function(e) {
      //     e.preventDefault(); // prevent native submit
      // });

      // $('#submit-button').on("submit", function() {
      //   $('#uploadForm').submit();
      // });

      // $('#uploadForm').submit(function() {
      //   console.log($this)
        
      //   return false;
      // });
      
      

      
      return this;
    },
    submitForm: function(e) {
      var that = this;
      console.log(e);
      e.preventDefault();
      
      function status(message) {
        that.$el.find('#admin-status').text(message);
      }

      status('uploading the file ...');

      that.$el.find('#uploadForm').ajaxSubmit({                                                                                                                 
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

    }
  });

  return ImageUploaderView;
});
