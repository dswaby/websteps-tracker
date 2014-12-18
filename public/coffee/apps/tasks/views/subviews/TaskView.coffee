define (require) ->
  Backbone = require("Backbone")
  EmailView = Backbone.View.extend(
    tagName: "tr"
    template: require("hbs!./../../templates/TaskView")
    render: ->
      @$el.html @template(@model.toJSON())
      this
  )
  EmailView

