define (require) ->
  Backbone = require("Backbone")
  HeaderView = Backbone.View.extend(
    template: require("hbs!./../templates/HeaderView")
    render: ->
      @$el.html @template(title: "TheMailer")
      this
  )
  HeaderView

