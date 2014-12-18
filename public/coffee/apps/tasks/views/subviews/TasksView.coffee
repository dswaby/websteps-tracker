define (require) ->
  Backbone = require("Backbone")
  TaskView = require("./TaskView")
  InboxView = Backbone.View.extend(
    template: require("hbs!./../../templates/TasksView")
    initialize: ->
      @subviews = []
      return

    render: ->
      @$el.html @template()
      mails = @$(".tasks")
      @collection.forEach ((mail) ->
        view = new TaskView(model: mail)
        mails.append view.render().el
        @subviews.push view
        return
      ), this
      this
  )
  InboxView

