define (require) ->
  Backbone = require("Backbone")
  EmailView = require("./EmailView")
  InboxView = Backbone.View.extend(
    template: require("hbs!./../../templates/InboxView")
    initialize: ->
      @subviews = []
      return

    render: ->
      @$el.html @template()
      mails = @$(".mails")
      @collection.forEach ((mail) ->
        view = new EmailView(model: mail)
        mails.append view.render().el
        @subviews.push view
        return
      ), this
      this
  )
  InboxView

