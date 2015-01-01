define(function(require) {
	var Backbone = require('Backbone');

	var ContactsView = require('./subviews/ContactsView');
  var GlucoseChartView = require('./subviews/GlucoseChartView');


	var MainView = Backbone.View.extend({
    className: 'charts-main-view',
		initialize: function () {
			this.subviews = [];
		},

		render: function () {
      var glucoseChartView = new GlucoseChartView();
      this.$el.append(glucoseChartView.render().el);
			var contactsView = new ContactsView({collection: this.collection});
			this.$el.append(contactsView.render().el);
			this.subviews.push(contactsView);

			return this;
		}
	});

	return MainView;
});