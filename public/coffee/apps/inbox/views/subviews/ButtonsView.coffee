define (require) ->
  Backbone = require("Backbone")
  ButtonsView = Backbone.View.extend(
    template: require("hbs!./../../templates/ButtonsView")
    render: ->
      @$el.html @template()
      this
  )
  ButtonsView

