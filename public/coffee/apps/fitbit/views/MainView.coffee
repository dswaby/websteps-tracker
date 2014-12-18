define (require) ->
  Backbone = require("Backbone")
  PicturesView = require("./subviews/PicturesView")
  RunningManView = require("./subviews/RunningManView")
  MainView = Backbone.View.extend(
    initialize: ->
      @subviews = []
      return

    render: ->
      runningManView = new RunningManView()
      @$el.append runningManView.render().el
      @subviews.push runningManView
      picturesView = new PicturesView(collection: @collection)
      @$el.append picturesView.render().el
      @subviews.push picturesView
      this
  )
  MainView

