define (require) ->
  Backbone = require("Backbone")
  RunningManView = Backbone.View.extend(
    template: require("hbs!./../../templates/RunningManView")
    render: ->
      @$el.html @template()
      this

    onRender: ->
  )
  
  #do something
  RunningManView

