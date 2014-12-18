define (require) ->
  $ = require("jQuery")
  transition = require("./transition")
  viewManager = (->
    showView = (view) ->
      disposeView currentView, ->
        render view
        return

      return
    disposeView = (view, callback) ->
      applyTransition = (el, name, callback) ->
        return callback()  unless name
        transition.apply el, name, callback
      _disposeView = (view) ->
        view.subviews and view.subviews.forEach((subview) ->
          _disposeView subview
          return
        )
        view.remove()
        return
      return callback()  unless view
      return applyTransition(view.$el, transitionType, ->
        _disposeView view
        callback()
      )
      return
    render = (view) ->
      currentView = view
      $("#app").html currentView.el
      currentView.render()
      return
    currentView = undefined
    transitionType = $("#app").data("transition")
    show: showView
  )()
  viewManager

