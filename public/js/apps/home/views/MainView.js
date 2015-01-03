define(function (require) {
	var Backbone = require('Backbone');

	var HeaderView = require('./HeaderView');
	var FooterView = require('./FooterView');
  require("velocity");
	var MainView = Backbone.View.extend({
		initialize: function () {
			this.subviews = [];
		},

		render: function () {
			var headerView = new HeaderView();
			this.subviews.push(headerView);
			this.$el.append(headerView.render().el);

			var footerView = new FooterView();
			this.subviews.push(footerView);
			this.$el.append(footerView.render().el);

      // var condescendingStatements = ["There are two reasons why you would land on this page", "Either you have accused me of cheating on fitbit", "or you are trying every subdomain of http://swa.by to see if there is a page there", "lets be realistic...."];

			return this;
		}
	});
  // $(document).on('keyup', function(e){
    

  //   keycode = e.keyCode || e.which;

  //   tdog(keycode);


      

  //   if (e.type === "keyup" && !e.shiftKey) {
  //     console.log("1")
  //   }
    


  //   alert("success");

  // } );
  // function tdog(keycode) {
  //   var cache = [];
  //   var code = [84,68,79,71];

  //   if ( code.length > cache.length +1 ) {
  //       cache.push(keycode);
  //       return;
  //     }

  //     if ( code.length < cache.length ) {
  //       cache.shift();

  //     }

  //     if ( code.toString() !== cache.toString() ) {
  //       return;
  //     }
  // }
	return MainView;
});