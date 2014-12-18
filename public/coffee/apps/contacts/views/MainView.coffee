define (require) ->
  Backbone = require("Backbone")
  ContactsView = require("./subviews/ContactsView")
  MainView = Backbone.View.extend(
    initialize: ->
      @subviews = []
      return

    render: ->
      contactsView = new ContactsView(collection: @collection)
      @$el.append contactsView.render().el
      @subviews.push contactsView
      this
  )
  MainView

