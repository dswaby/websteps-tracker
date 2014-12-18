define (require) ->
  Backbone = require("Backbone")
  PictureView = Backbone.View.extend(
    tagName: "div"
    className: "fitbit-item-view"
    template: require("hbs!./../../templates/PictureView")
    render: ->
      @$el.html @template(@model.toJSON())
      this
  )
  PictureView

