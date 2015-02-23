define(function (require) {
  var Backbone = require('Backbone');

  var ChartView = Backbone.View.extend({
    template: require('hbs!./../../templates/GlucoseChartView'),
    className: 'glucose-chart-view',
    render: function () {
      var $el = this.$el;

      this.$ = function (sel) {
        return this.$el.find(sel);
      };
      
      $el.html(this.template());
      require(['d3', 'c3'], function(d3, c3) {
        c3.generate({
          bindto: '#glucose-chart',
          data: {
            url: './glucose.csv'
          }
        });
      });
      
      return this;
    }

  });

  return ChartView;
});