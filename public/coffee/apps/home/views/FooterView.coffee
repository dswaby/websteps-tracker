define (require) ->
  Backbone = require("Backbone")
  FooterView = Backbone.View.extend(
    template: require("hbs!./../templates/FooterView")
    render: ->
      @$el.html @template()
      this
  )
  FooterView

