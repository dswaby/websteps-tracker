define (require) ->
  Backbone = require("Backbone")
  ComposeEmailView = require("./subviews/ComposeEmailView")
  MainView = Backbone.View.extend(
    initialize: ->
      @subviews = []
      return

    render: ->
      composeEmailView = new ComposeEmailView(model: @model)
      @$el.append composeEmailView.render().el
      @subviews.push composeEmailView
      this
  )
  MainView

