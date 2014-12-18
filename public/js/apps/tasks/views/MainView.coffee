define (require) ->
  Backbone = require("Backbone")
  TasksView = require("./subviews/TasksView")
  MainView = Backbone.View.extend(
    initialize: ->
      @subviews = []
      return

    render: ->
      contactsView = new TasksView(collection: @collection)
      @$el.append contactsView.render().el
      @subviews.push contactsView
      this
  )
  MainView

