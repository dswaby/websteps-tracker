define(function (require) {
	var Backbone = require('Backbone');
  var util = require('./../../../common/utils');
  // require('velocity');
	var HomeView = Backbone.View.extend({
		template: require('hbs!./../templates/HomeView'),
    className: "home-view",
    events: {
      'click a#dismissal': 'dismissAlert',
      'click a#more': 'scrollMore'
    },
    initialize: function() {
      var that = this;
      if (!window.localStorage) {
        util.localStoragePolyfill();
      }
      that.dismissed = localStorage.getItem("dismissed");
    },
		render: function () {
      var that = this;
      if (!that.dismissed) {
        that.model.set("showWelcome", true);
      }
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
    dismissAlert: function(e){
      var that = this;
      e.preventDefault();
      e.stopPropagation();
      that.$el.find("#welcome-notification").fadeOut();
      localStorage.setItem("dismissed", true);
    },
    scrollMore: function(e) {
      e.preventDefault();
      e.stopPropagation();
      var about = $(".about-section").offset().top;
      $(".home-main-view").animate({
        scrollTop: about
    }, 2000);
    }
	});

	return HomeView;
});