define (require) ->
  Backbone = require("Backbone")
  ComposeEmailView = Backbone.View.extend(
    template: require("hbs!./../../templates/ComposeEmailView")
    events:
      "click #send": "sendEmail"

    render: ->
      @$el.html @template()
      this

    sendEmail: (e) ->
      e.preventDefault()
      attributes =
        to: @$("#to").val()
        cc: @$("#cc").val()
        subject: @$("#subject").val()
        message: @$("#message").val()
        sentDate: "04/25/2013"

      alerts = @$(".alerts")
      @model.save attributes,
        success: ->
          alerts.append "<div class=\"alert alert-success\"><b>Success!</b> Message sent. You will be redirected to inbox now...</div>"
          setTimeout (->
            window.Router.navigate "/inbox",
              trigger: true

            return
          ), 1500
          return

      return
  )
  ComposeEmailView

