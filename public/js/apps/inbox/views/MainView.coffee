define (require) ->
  Backbone = require("Backbone")
  ButtonsView = require("./subviews/ButtonsView")
  InboxView = require("./subviews/InboxView")
  MainView = Backbone.View.extend(
    initialize: ->
      @subviews = []
      return

    render: ->
      buttonsView = new ButtonsView()
      @$el.append buttonsView.render().el
      @subviews.push buttonsView
      inboxView = new InboxView(collection: @collection)
      @$el.append inboxView.render().el
      @subviews.push inboxView
      this
  )
  MainView

