define (require) ->
  Backbone = require("Backbone")
  PictureView = require("./PictureView")
  FitBitVizView = Backbone.View.extend(
    template: require("hbs!./../../templates/PicturesView")
    initialize: ->
      @subviews = []
      return

    render: ->
      @$el.html @template()
      pictures = @$(".pictures")
      console.log this
      @collection.forEach ((picture) ->
        view = new PictureView(model: picture)
        pictures.append view.render().el
        @subviews.push view
        return
      ), this
      this
  )
  FitBitVizView

