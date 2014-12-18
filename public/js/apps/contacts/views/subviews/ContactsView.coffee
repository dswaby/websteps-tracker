define (require) ->
  Backbone = require("Backbone")
  ContactView = require("./ContactView")
  InboxView = Backbone.View.extend(
    template: require("hbs!./../../templates/ContactsView")
    initialize: ->
      @subviews = []
      return

    render: ->
      @$el.html @template()
      mails = @$(".contacts")
      @collection.forEach ((mail) ->
        view = new ContactView(model: mail)
        mails.append view.render().el
        @subviews.push view
        return
      ), this
      this
  )
  InboxView

