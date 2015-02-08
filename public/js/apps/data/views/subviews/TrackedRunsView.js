define(function(require) {
	var Backbone = require('Backbone');
  var TrackedRunView = require('./TrackedRunView');
  
	var TrackedRunsView = Backbone.View.extend({
    className: "trackedrun-collection-view",
		template: require('hbs!./../../templates/TrackedRunsView'),
    events:{
      'click #all-tracked-routes':'showAllMaps'
    },
    initialize: function () {
      this.subviews = [];
    },
		render: function () {
      this.$el.html(this.template());
      var runs = this.$('.runs');
      
      var count;
      if (this.collection.length > 10) {
        count = 10;
      }
      else {
        count = this.collection.length;
      }

      for (var i = 0; i < count; i++) {
        index = this.collection.length - (i + 1);
        var view = new TrackedRunView({model: this.collection.at(index)});
        runs.append(view.render().el);
        this.subviews.push(view);
      }

      return this;
		},
    showAllMaps: function(e){
      e.preventDefault();
      console.log("view all clicked");
    }
	});

	return TrackedRunsView;
});