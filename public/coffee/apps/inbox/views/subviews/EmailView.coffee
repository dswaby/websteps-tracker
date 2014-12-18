define (require) ->
  Backbone = require("Backbone")
  EmailView = Backbone.View.extend(
    tagName: "tr"
    template: require("hbs!./../../templates/EmailView")
    render: ->
      @$el.html @template(@model.toJSON())
      this
  )
  EmailView

