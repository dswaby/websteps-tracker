define (require) ->
  Backbone = require("Backbone")
  EmailView = Backbone.View.extend(
    tagName: "tr"
    template: require("hbs!./../../templates/ContactView")
    render: ->
      @$el.html @template(@model.toJSON())
      this
  )
  EmailView

